import { useEffect, useState } from "react";
const blank = {
  title: "",
  description: "",
  priority: "MEDIUM",
  dueDate: "",
  completed: false,
};
export default function TaskForm({ editingTask, onSave, onCancel }) {
  const [form, setForm] = useState(blank);
  useEffect(
    () =>
      setForm(
        editingTask
          ? {
              title: editingTask.title || "",
              description: editingTask.description || "",
              priority: editingTask.priority || "MEDIUM",
              dueDate: editingTask.dueDate || "",
              completed: !!editingTask.completed,
            }
          : blank,
      ),
    [editingTask],
  );
  const change = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  async function submit(e) {
    e.preventDefault();
    if (!form.title.trim()) return;
    await onSave({
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
      dueDate: form.dueDate || null,
    });
    if (!editingTask) setForm(blank);
  }
  return (
    <form className="task-form" onSubmit={submit}>
      <p className="eyebrow">{editingTask ? "EDIT TASK" : "NEW TASK"}</p>
      <h2>{editingTask ? "Update task" : "Add something to your list"}</h2>
      <label>
        Task title
        <input
          name="title"
          value={form.title}
          onChange={change}
          maxLength="120"
          required
          placeholder="e.g. Build portfolio website"
        />
      </label>
      <label>
        Description
        <textarea
          name="description"
          value={form.description}
          onChange={change}
          rows="3"
          maxLength="1000"
          placeholder="Add useful details..."
        />
      </label>
      <div className="form-grid">
        <label>
          Priority
          <select name="priority" value={form.priority} onChange={change}>
            <option>LOW</option>
            <option>MEDIUM</option>
            <option>HIGH</option>
          </select>
        </label>
        <label>
          Due date
          <input
            name="dueDate"
            type="date"
            value={form.dueDate}
            onChange={change}
          />
        </label>
      </div>
      <div className="form-actions">
        <button className="primary">
          {editingTask ? "Save changes" : "Create task"}
        </button>
        {editingTask && (
          <button className="secondary" type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
