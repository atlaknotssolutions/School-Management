import { useEffect, useMemo, useState } from "react";
import {
  Plus,
  BedDouble,
  Building2,
  X,
  Save,
  User,
  Trash2,
  Users,
  DoorOpen,
} from "lucide-react";
import {
  PageIntro,
  Card,
  Button,
  Input,
  Select,
  Pill,
  StatCard,
  toast,
} from "../components/UI";
import {
  hostelRooms as roomsSeed,
  hostelStudents as studentSeed,
} from "../data/modules";
import { api } from "../lib/api";

const WINGS = ["Boys", "Girls"];
const BLOCKS = ["A", "B", "C", "D"];

function nextRoomId(list) {
  const max = list.reduce((m, r) => {
    const num = parseInt(String(r.id).replace(/\D/g, ""), 10);
    return Number.isFinite(num) && num > m ? num : m;
  }, 100);
  return `HR-${max + 1}`;
}

function emptyRoomForm(wing) {
  return { id: "", block: "A", capacity: 3, floor: 1, wing: wing || "Boys" };
}

function emptyAllotForm() {
  return { studentId: "", name: "", moveOutRoom: "" };
}

function normalizeRoom(room, knownStudents = {}) {
  return {
    ...room,
    id: room.roomNo || room.id || room._id,
    backendId: room._id || room.backendId,
    occupants: (room.occupants || []).map((studentId) => ({
      id: studentId,
      name: knownStudents[studentId]?.name || studentId,
    })),
  };
}

export default function Hostel() {
  const [rooms, setRooms] = useState(roomsSeed);
  const [hostelStudents, setHostelStudents] = useState(studentSeed);
  const [wingFilter, setWingFilter] = useState("All");
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [roomForm, setRoomForm] = useState(emptyRoomForm("Boys"));
  const [showAllotModal, setShowAllotModal] = useState(false);
  const [allotForm, setAllotForm] = useState(emptyAllotForm());

  useEffect(() => {
    Promise.all([api.hostel.list(), api.students.list("limit=1000")])
      .then(([roomResponse, studentResponse]) => {
        const knownStudents = Object.fromEntries(
          (studentResponse.data || []).map((student) => [
            student._id || student.id || student.admissionNo,
            { name: student.name },
          ]),
        );
        const loadedRooms = (roomResponse.data || []).map((room) =>
          normalizeRoom(room, knownStudents),
        );
        setRooms(loadedRooms);
        setHostelStudents(
          loadedRooms.flatMap((room) =>
            room.occupants.map((student) => ({
              ...student,
              hostelRoom: room.id,
            })),
          ),
        );
      })
      .catch((error) =>
        toast(`Hostel data unavailable: ${error.message}`, "error"),
      );
  }, []);

  const filteredRooms = useMemo(
    () => rooms.filter((r) => wingFilter === "All" || r.wing === wingFilter),
    [rooms, wingFilter],
  );

  const totalStudents = hostelStudents.length;
  const occupiedRooms = rooms.filter((r) => r.occupants.length > 0).length;
  const totalCapacity = rooms.reduce((a, r) => a + r.capacity, 0);
  const availableBeds = totalCapacity - totalStudents;

  const occupantsOf = (roomId) =>
    hostelStudents.filter((s) => s.hostelRoom === roomId);

  const addRoom = async () => {
    try {
      const { data } = await api.hostel.create({
        roomNo: nextRoomId(rooms),
        block: roomForm.block,
        floor: roomForm.floor,
        wing: roomForm.wing,
        capacity: roomForm.capacity,
      });
      setRooms((prev) => [...prev, normalizeRoom(data)]);
      setShowRoomModal(false);
      setRoomForm(emptyRoomForm(roomForm.wing));
      toast("Room added");
    } catch (error) {
      toast(error.message, "error");
    }
  };

  const deleteRoom = async (id) => {
    const room = rooms.find((item) => item.id === id);
    if (occupantsOf(id).length) {
      toast("Move out occupants first", "error");
      return;
    }
    try {
      await api.hostel.remove(room.backendId || id);
      setRooms((prev) => prev.filter((r) => r.id !== id));
      toast("Room removed", "info");
    } catch (error) {
      toast(error.message, "error");
    }
  };

  const allotStudent = async () => {
    const room = rooms.find((r) => r.id === allotForm.moveOutRoom);
    if (!room) {
      toast("Select a room", "error");
      return;
    }
    const current = occupantsOf(room.id).length;
    if (current >= room.capacity) {
      toast("Room is full", "error");
      return;
    }
    const studentId = allotForm.studentId.trim() || allotForm.name.trim();
    try {
      await api.hostel.allot(room.backendId || room.id, { studentId });
      const student = {
        id: studentId,
        name: allotForm.name.trim(),
        hostelRoom: room.id,
      };
      setHostelStudents((prev) => [...prev, student]);
      setRooms((prev) =>
        prev.map((item) =>
          item.id === room.id
            ? { ...item, occupants: [...item.occupants, student] }
            : item,
        ),
      );
      setShowAllotModal(false);
      setAllotForm(emptyAllotForm());
      toast("Student allotted to " + room.id);
    } catch (error) {
      toast(error.message, "error");
    }
  };

  const moveOut = async (studentId, roomId) => {
    const room = rooms.find((item) => item.id === roomId);
    try {
      await api.hostel.vacate(room.backendId || room.id, studentId);
      setHostelStudents((prev) => prev.filter((s) => s.id !== studentId));
      setRooms((prev) =>
        prev.map((item) =>
          item.id === roomId
            ? {
                ...item,
                occupants: item.occupants.filter((s) => s.id !== studentId),
              }
            : item,
        ),
      );
      toast("Student moved out", "info");
    } catch (error) {
      toast(error.message, "error");
    }
  };

  return (
    <div className="space-y-6">
      <PageIntro
        eyebrow="Operations"
        title="Hostel Management"
        description="Manage hostel rooms, allotments and occupancy."
        right={
          <>
            <Button variant="amber" onClick={() => setShowAllotModal(true)}>
              <Plus size={15} /> Allot Room
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setShowRoomModal(true);
                setRoomForm(
                  emptyRoomForm(wingFilter === "Girls" ? "Girls" : "Boys"),
                );
              }}
            >
              <Plus size={15} /> Add Room
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Users}
          label="Hostel Students"
          value={String(totalStudents)}
          sub="Currently allotted"
          accent="amber"
        />
        <StatCard
          icon={BedDouble}
          label="Occupied Rooms"
          value={`${occupiedRooms} / ${rooms.length}`}
          sub="In use"
          accent="info"
        />
        <StatCard
          icon={DoorOpen}
          label="Total Capacity"
          value={String(totalCapacity)}
          sub="Beds available"
          accent="success"
        />
        <StatCard
          icon={Building2}
          label="Vacant Beds"
          value={String(Math.max(0, availableBeds))}
          sub="Still available"
          accent="alert"
        />
      </div>

      <div className="flex gap-1.5">
        {["All", ...WINGS].map((w) => (
          <button
            key={w}
            onClick={() => setWingFilter(w)}
            className={`px-3.5 py-1.5 rounded-full text-[12.5px] font-semibold border transition-colors ${
              wingFilter === w
                ? "bg-ink text-white border-ink"
                : "bg-white text-slate-text border-black/10 hover:border-ink/30"
            }`}
          >
            {w === "All" ? "All Wings" : w}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRooms.map((r) => {
          const occupants = occupantsOf(r.id);
          const vacant = r.capacity - occupants.length;
          return (
            <Card key={r.id}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-display font-bold text-ink text-[17px]">
                    {r.id}
                  </p>
                  <p className="text-[11.5px] text-slate-text/60">
                    Block {r.block} · Floor {r.floor} · {r.wing}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Pill tone={vacant > 0 ? "success" : "alert"}>
                    {vacant > 0 ? `${vacant} vacant` : "Full"}
                  </Pill>
                  <button
                    onClick={() => deleteRoom(r.id)}
                    className="p-1.5 rounded-lg hover:bg-paper text-slate-text/50 hover:text-alert transition-colors"
                    title="Delete room"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                {occupants.length === 0 ? (
                  <p className="text-[13px] text-slate-text/50 text-center py-3 bg-paper rounded-lg">
                    No occupants
                  </p>
                ) : (
                  occupants.map((s) => (
                    <div
                      key={s.id}
                      className="flex items-center justify-between bg-paper rounded-lg px-3 py-2"
                    >
                      <p className="text-[13px] font-medium text-ink">
                        {s.name}
                      </p>
                      <button
                        onClick={() => moveOut(s.id, r.id)}
                        className="text-[11.5px] font-semibold text-alert hover:underline"
                      >
                        Move out
                      </button>
                    </div>
                  ))
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {showRoomModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
            onClick={() => setShowRoomModal(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-black/6">
              <h3 className="font-display font-semibold text-ink text-[17px]">
                Add Room
              </h3>
              <button
                onClick={() => setShowRoomModal(false)}
                className="p-2 rounded-lg hover:bg-paper text-slate-text"
              >
                <X size={20} />
              </button>
            </div>
            <div className="px-5 py-4 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[12px] font-semibold text-ink mb-1.5 block">
                    Block
                  </label>
                  <Select
                    value={roomForm.block}
                    onChange={(e) =>
                      setRoomForm((f) => ({ ...f, block: e.target.value }))
                    }
                  >
                    {BLOCKS.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </Select>
                </div>
                <div>
                  <label className="text-[12px] font-semibold text-ink mb-1.5 block">
                    Floor
                  </label>
                  <Input
                    type="number"
                    min={1}
                    value={roomForm.floor}
                    onChange={(e) =>
                      setRoomForm((f) => ({
                        ...f,
                        floor: Number(e.target.value),
                      }))
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[12px] font-semibold text-ink mb-1.5 block">
                    Wing
                  </label>
                  <Select
                    value={roomForm.wing}
                    onChange={(e) =>
                      setRoomForm((f) => ({ ...f, wing: e.target.value }))
                    }
                  >
                    {WINGS.map((w) => (
                      <option key={w} value={w}>
                        {w}
                      </option>
                    ))}
                  </Select>
                </div>
                <div>
                  <label className="text-[12px] font-semibold text-ink mb-1.5 block">
                    Capacity
                  </label>
                  <Input
                    type="number"
                    min={1}
                    value={roomForm.capacity}
                    onChange={(e) =>
                      setRoomForm((f) => ({
                        ...f,
                        capacity: Number(e.target.value),
                      }))
                    }
                  />
                </div>
              </div>
            </div>
            <div className="px-5 py-4 border-t border-black/6 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowRoomModal(false)}>
                Cancel
              </Button>
              <Button variant="amber" onClick={addRoom}>
                <Save size={15} /> Add Room
              </Button>
            </div>
          </div>
        </div>
      )}

      {showAllotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
            onClick={() => setShowAllotModal(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-black/6">
              <h3 className="font-display font-semibold text-ink text-[17px]">
                Allot Room
              </h3>
              <button
                onClick={() => setShowAllotModal(false)}
                className="p-2 rounded-lg hover:bg-paper text-slate-text"
              >
                <X size={20} />
              </button>
            </div>
            <div className="px-5 py-4 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[12px] font-semibold text-ink mb-1.5 block">
                    Student Name *
                  </label>
                  <Input
                    value={allotForm.name}
                    onChange={(e) =>
                      setAllotForm((f) => ({ ...f, name: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <label className="text-[12px] font-semibold text-ink mb-1.5 block">
                    Student ID
                  </label>
                  <Input
                    value={allotForm.studentId}
                    onChange={(e) =>
                      setAllotForm((f) => ({ ...f, studentId: e.target.value }))
                    }
                  />
                </div>
              </div>
              <div>
                <label className="text-[12px] font-semibold text-ink mb-1.5 block">
                  Select Room
                </label>
                <Select
                  value={allotForm.moveOutRoom}
                  onChange={(e) =>
                    setAllotForm((f) => ({ ...f, moveOutRoom: e.target.value }))
                  }
                >
                  <option value="">Choose room...</option>
                  {rooms
                    .filter((r) => occupantsOf(r.id).length < r.capacity)
                    .map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.id} · Block {r.block} · {r.wing} (
                        {occupantsOf(r.id).length}/{r.capacity})
                      </option>
                    ))}
                </Select>
              </div>
            </div>
            <div className="px-5 py-4 border-t border-black/6 flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowAllotModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="amber"
                onClick={allotStudent}
                disabled={!allotForm.name.trim() || !allotForm.moveOutRoom}
              >
                <User size={15} /> Allot Student
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
