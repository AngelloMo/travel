// Timeline Item Web Component
class TimelineItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const time = this.getAttribute('time') || '';
        const title = this.getAttribute('title') || '';
        const content = this.innerHTML;

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    position: relative;
                    margin-bottom: 50px;
                    background: #FFFFFF;
                    padding: 25px;
                    border-radius: 15px;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    font-family: 'Pretendard', sans-serif;
                }
                :host(:hover) {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                }
                .dot {
                    position: absolute;
                    left: -44px;
                    top: 25px;
                    width: 14px;
                    height: 14px;
                    border-radius: 50%;
                    background: #FF8C00;
                    border: 4px solid white;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
                    z-index: 1;
                }
                .time {
                    display: inline-block;
                    background: #FFF5E6;
                    color: #FF8C00;
                    padding: 2px 12px;
                    border-radius: 5px;
                    font-weight: 800;
                    font-size: 1rem;
                    margin-bottom: 10px;
                }
                h3 {
                    margin: 8px 0;
                    font-size: 1.4rem;
                    font-weight: 700;
                    color: #2D3436;
                }
                .content {
                    color: #636E72;
                    font-size: 1rem;
                    line-height: 1.6;
                }
                ::slotted(a) {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    color: #4A90E2;
                    text-decoration: none;
                    font-size: 0.9rem;
                    font-weight: 600;
                    margin-top: 10px;
                    transition: color 0.3s ease;
                }
                ::slotted(a:hover) {
                    color: #FF8C00;
                }
                ::slotted(.img-container) {
                    width: 100%;
                    margin: 15px 0;
                    border-radius: 12px;
                    overflow: hidden;
                }
                ::slotted(img) {
                    width: 100%;
                    height: 200px;
                    object-fit: cover;
                    display: block;
                }
            </style>
            <div class="dot"></div>
            <div class="time">${time}</div>
            <h3>${title}</h3>
            <div class="content">
                <slot></slot>
            </div>
        `;
    }
}
customElements.define('timeline-item', TimelineItem);

function showDay(dayId) {
    // 모든 섹션 숨기기
    const sections = document.querySelectorAll('.day-section');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    // 선택한 섹션 보이기
    const selectedSection = document.getElementById(dayId);
    if (selectedSection) {
        selectedSection.style.display = 'block';
    }

    // 네비게이션 활성화 표시
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${dayId}`) {
            link.classList.add('active');
        }
    });

    // 화면 상단으로 스크롤 (헤더 아래 네비게이션 위치쯤으로)
    const scrollTarget = (dayId === 'prep' || dayId === 'privacy' || dayId === 'about' || dayId === 'contact') ? 0 : 300;
    window.scrollTo({ top: scrollTarget, behavior: 'smooth' });
}

// 쿠키 동의 처리
function acceptCookies() {
    localStorage.setItem('cookie-consent', 'accepted');
    const banner = document.getElementById('cookie-banner');
    if (banner) {
        banner.style.display = 'none';
    }
}

// 초기 로딩 시 처리
document.addEventListener('DOMContentLoaded', () => {
    // URL 해시가 있으면 해당 데이로, 없으면 Day 1
    const hash = window.location.hash.replace('#', '');
    if (hash && document.getElementById(hash)) {
        showDay(hash);
    } else {
        showDay('day1'); // 기본값 Day 1
    }

    // 쿠키 동의 확인
    if (localStorage.getItem('cookie-consent') === 'accepted') {
        const banner = document.getElementById('cookie-banner');
        if (banner) {
            banner.style.display = 'none';
        }
    }
});
