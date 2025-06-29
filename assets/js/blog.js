
        // Mission history data - this would typically come from a database or API
        const missionHistory = {
            mlab: {
                title: "Medical Lab Website + Integration",
                editions: [
                    {
                        date: "Day 1 - Current",
                        title: "Mission Initiated",
                        description: "Project planning and initial setup phase",
                        changes: [
                            "Conducted initial project kickoff meeting",
                            "Created detailed project requirements document",
                        ],
                        current: true
                    }
                ]
            },
        };

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.mission-post, .section-title').forEach(element => {
            observer.observe(element);
        });

        document.querySelectorAll('.mission-post').forEach((post, index) => {
            post.style.transitionDelay = `${index * 0.2}s`;
        });

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero-content');
            const rate = scrolled * -0.5;
            
            if (hero) {
                hero.style.transform = `translateY(${rate}px)`;
            }
        });

        const modal = document.getElementById('previousEditionsModal');
        const modalTitle = document.getElementById('modalTitle');
        const timelineContainer = document.getElementById('timelineContainer');
        const closeBtn = document.getElementById('closeModal');

        function createTimelineHTML(editions) {
            return editions.map(edition => {
                const markerClass = edition.current ? 'timeline-marker current' : 'timeline-marker';
                const changesHTML = edition.changes.map(change => `<li>${change}</li>`).join('');
                
                return `
                    <div class="timeline-item">
                        <div class="${markerClass}"></div>
                        <div class="timeline-content">
                            <div class="timeline-date">${edition.date}</div>
                            <h4 class="timeline-title">${edition.title}</h4>
                            <p class="timeline-description">${edition.description}</p>
                            <ul class="timeline-changes">
                                ${changesHTML}
                            </ul>
                        </div>
                    </div>
                `;
            }).join('');
        }

        function openPreviousEditions(missionKey) {
            const mission = missionHistory[missionKey];
            if (!mission) return;

            modalTitle.textContent = `${mission.title} - Timeline`;
            timelineContainer.innerHTML = createTimelineHTML(mission.editions);
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closePreviousEditions() {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }

        document.querySelectorAll('.previous-editions-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const missionKey = button.getAttribute('data-mission');
                openPreviousEditions(missionKey);
            });
        });

        closeBtn.addEventListener('click', closePreviousEditions);

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closePreviousEditions();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closePreviousEditions();
            }
        });