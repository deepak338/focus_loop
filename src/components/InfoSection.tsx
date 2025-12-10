import React from 'react';

export const InfoSection: React.FC = () => {
    return (
        <section className="info-section">
            <div className="info-container">
                <article className="info-article">
                    <h2>Boost Productivity with Focus Loop</h2>
                    <p>
                        Focus Loop is a powerful, customizable productivity timer designed to help you stay focused and achieve your goals using the proven Pomodoro Technique. Whether you're a student, professional, or creative, managing your time effectively is key to success.
                    </p>

                    <h3>What is the Pomodoro Technique?</h3>
                    <p>
                        The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s. It uses a timer to break work into intervals, traditionally 25 minutes in length, separated by short breaks. These intervals are known as "Pomodoros".
                    </p>
                    <p>
                        The core process is simple:
                    </p>
                    <ol>
                        <li>Choose a task you'd like to get done.</li>
                        <li>Set the Pomodoro timer (typically for 25 minutes).</li>
                        <li>Work on the task until the timer rings.</li>
                        <li>Take a short break (5 minutes).</li>
                        <li>Every 4 Pomodoros, take a longer break (15-30 minutes).</li>
                    </ol>

                    <h3>Why Use Focus Loop?</h3>
                    <p>
                        Focus Loop takes this classic technique and adds modern features to enhance your workflow:
                    </p>
                    <ul>
                        <li><strong>Customizable Timers:</strong> Adjust work and break durations to match your personal rhythm.</li>
                        <li><strong>Loop Mode:</strong> Automatically cycle through work and break sessions without manual intervention.</li>
                        <li><strong>Distraction-Free Interface:</strong> A clean, dark-mode design that helps you maintain focus.</li>
                        <li><strong>Audio Alerts:</strong> Gentle notifications to let you know when to switch modes.</li>
                        <li><strong>Privacy First:</strong> All existing data is stored locally in your browser. We don't track your activity.</li>
                    </ul>

                    <h3>Tips for Maximum Focus</h3>
                    <p>
                        To get the most out of your sessions, try to eliminate external distractions. Silencing your phone and closing unnecessary browser tabs can significantly improve your concentration during the 25-minute work blocks. Remember, the breaks are just as important as the work—use them to stretch, hydrate, or rest your eyes.
                    </p>
                </article>
            </div>
        </section>
    );
};
