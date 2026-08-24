import { useEffect, useMemo, useState } from "react";
import { taskApi } from "./api";
import Stats from "./components/Stats";
import TaskCard from "./components/TaskCard";
import TaskForm from "./components/TaskForm";

export default function DashboardApp({ user, onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    try {
      setError("");
      setTasks(await taskApi.list());
    } catch (err) {
      setError(err.message);

      if (err.message.toLowerCase().includes("unauthorized")) {
        onLogout();
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function save(task) {
    try {
      if (editing) {
        await taskApi.update(editing.id, task);
      } else {
        await taskApi.create(task);
      }

      setEditing(null);
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  async function toggle(id) {
    try {
      await taskApi.toggle(id);
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  async function del(id) {
    if (!window.confirm("Delete this task?")) return;

    try {
      await taskApi.remove(id);

      if (editing?.id === id) {
        setEditing(null);
      }

      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  const visible = useMemo(() => {
    if (filter === "ACTIVE") {
      return tasks.filter((task) => !task.completed);
    }

    if (filter === "COMPLETED") {
      return tasks.filter((task) => task.completed);
    }

    return tasks;
  }, [tasks, filter]);

  return (
    <main>
      <header className="hero">
        <nav>
          <a className="brand" href="/">
            FlowyTasks
          </a>

          <div className="account-nav">
            <span>Hi, {user?.name}</span>
            <button type="button" onClick={onLogout}>
              Log out
            </button>
          </div>
        </nav>

        <div className="hero-copy">
          <p className="eyebrow">PLAN • BUILD • FINISH</p>
          <h1>Keep your work moving.</h1>
          <p>Your task space is private to your account.</p>
        </div>
      </header>

      <div className="page">
        <Stats tasks={tasks} />

        {error && <div className="error">{error}</div>}

        <div className="content-grid">
          <TaskForm
            editingTask={editing}
            onSave={save}
            onCancel={() => setEditing(null)}
          />

          <section className="task-section">
            <div className="task-section-header">
              <div>
                <p className="eyebrow">YOUR WORK</p>
                <h2>Tasks</h2>
              </div>

              <div className="filters">
                {["ALL", "ACTIVE", "COMPLETED"].map((value) => (
                  <button
                    key={value}
                    className={filter === value ? "selected" : ""}
                    onClick={() => setFilter(value)}
                  >
                    {value.toLowerCase()}
                  </button>
                ))}
              </div>
            </div>

            {loading ? (
              <p className="empty">Loading tasks...</p>
            ) : visible.length === 0 ? (
              <p className="empty">
                No tasks here yet. Create one and it will appear here.
              </p>
            ) : (
              <div className="task-list">
                {visible.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onToggle={toggle}
                    onEdit={setEditing}
                    onDelete={del}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
