function showDay(dayId) {
    // 모든 섹션 숨기기
    const sections = document.querySelectorAll('.day-section');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    // 선택한 섹션 보이기
    document.getElementById(dayId).style.display = 'block';

    // 네비게이션 활성화 표시
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${dayId}`) {
            link.classList.add('active');
        }
    });

    // 화면 상단으로 스크롤 (부드럽게)
    window.scrollTo({ top: 250, behavior: 'smooth' });
}

// 초기 로딩 시 Day 1 보여주기 (기본값)
document.addEventListener('DOMContentLoaded', () => {
    // URL 해시가 있으면 해당 데이로, 없으면 Day 1
    const hash = window.location.hash.replace('#', '');
    if (hash && document.getElementById(hash)) {
        showDay(hash);
    }
});
