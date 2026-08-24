import { useState } from "react";
import DashboardApp from "./DashboardApp";

function WelcomePage({ onEnter }) {
  return (
    <main className="welcome-page">
      <div className="welcome-glow welcome-glow-one" aria-hidden="true" />
      <div className="welcome-glow welcome-glow-two" aria-hidden="true" />

      <nav className="welcome-nav">
        <a className="welcome-brand" href="/" aria-label="FlowyTasks home">
          <span className="welcome-brand-mark">F</span>
          <span>FlowyTasks</span>
        </a>
        <span className="welcome-nav-note">Make room for what matters.</span>
      </nav>

      <section className="welcome-content">
        <div className="welcome-copy">
          <p className="welcome-kicker">WELCOME TO FLOWYTASKS</p>
          <h1>
            A calmer way to keep
            <span> life moving.</span>
          </h1>
          <p className="welcome-summary">
            Bring your plans, priorities, and everyday to-dos into one clear
            space. FlowyTasks helps you see what needs your attention, stay
            focused on what matters now, and enjoy the satisfaction of moving
            things forward.
          </p>

          <div className="welcome-actions">
            <button className="welcome-enter" type="button" onClick={onEnter}>
              Open my task space
              <span aria-hidden="true">→</span>
            </button>
            <p>No clutter. Just a clearer view of your day.</p>
          </div>
        </div>

        <div className="welcome-preview" aria-label="FlowyTasks preview">
          <div className="preview-window">
            <div className="preview-topbar">
              <div className="preview-dots" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <span>Today</span>
            </div>

            <div className="preview-body">
              <p className="preview-label">A SIMPLE PLAN</p>
              <h2>Move through your day with clarity.</h2>

              <div className="preview-task preview-task-featured">
                <div className="preview-check">✓</div>
                <div>
                  <strong>Start with what matters most</strong>
                  <span>Keep priorities easy to spot.</span>
                </div>
              </div>

              <div className="preview-task">
                <div className="preview-check empty" />
                <div>
                  <strong>Give every task a place</strong>
                  <span>Capture the details before they get lost.</span>
                </div>
              </div>

              <div className="preview-task">
                <div className="preview-check empty" />
                <div>
                  <strong>Enjoy the progress</strong>
                  <span>See completed work add up.</span>
                </div>
              </div>

              <div className="preview-progress">
                <div>
                  <span>Today's momentum</span>
                  <strong>1 of 3</strong>
                </div>
                <div className="preview-progress-track">
                  <span />
                </div>
              </div>
            </div>
          </div>

          <div className="welcome-float-card">
            <span>✦</span>
            <div>
              <strong>Less mental clutter</strong>
              <small>Everything has a place.</small>
            </div>
          </div>
        </div>
      </section>

      <footer className="welcome-footer">
        <span>FlowyTasks</span>
        <span>Plan gently. Finish confidently.</span>
      </footer>
    </main>
  );
}

export default function App() {
  const [entered, setEntered] = useState(false);

  if (entered) {
    return <DashboardApp />;
  }

  return <WelcomePage onEnter={() => setEntered(true)} />;
}
