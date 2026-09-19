(function () {
  'use strict';

  const root = document.documentElement;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  root.classList.add('motion-ready');

  const revealItems = Array.from(document.querySelectorAll('.reveal'));

  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -7% 0px', threshold: 0.08 }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  const header = document.querySelector('[data-header]');
  const progressBar = document.querySelector('.page-progress span');
  let scrollFrame = null;

  const updateScrollUI = () => {
    const scrollTop = window.scrollY;
    const scrollRange = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = scrollRange > 0 ? Math.min(scrollTop / scrollRange, 1) : 0;

    header?.classList.toggle('is-scrolled', scrollTop > 20);
    if (progressBar) progressBar.style.transform = `scaleX(${scrollProgress})`;
    scrollFrame = null;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (scrollFrame !== null) return;
      scrollFrame = window.requestAnimationFrame(updateScrollUI);
    },
    { passive: true }
  );
  updateScrollUI();

  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.primary-nav');

  const setMenuState = (open, returnFocus = false) => {
    if (!menuButton || !header) return;
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    header.classList.toggle('menu-open', open);
    document.body.classList.toggle('menu-open', open);
    if (!open && returnFocus) menuButton.focus();
  };

  menuButton?.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    setMenuState(!isOpen);
  });

  navigation?.addEventListener('click', (event) => {
    if (event.target.closest('a')) setMenuState(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && header?.classList.contains('menu-open')) {
      setMenuState(false, true);
    }
  });

  document.addEventListener('click', (event) => {
    if (!header?.classList.contains('menu-open')) return;
    if (!header.contains(event.target)) setMenuState(false);
  });

  window.matchMedia('(min-width: 961px)').addEventListener('change', (event) => {
    if (event.matches) setMenuState(false);
  });

  const filterButtons = Array.from(document.querySelectorAll('.filter-button'));
  const residentCards = Array.from(document.querySelectorAll('.resident-card'));
  const filterStatus = document.querySelector('#filter-status');
  const surpriseButton = document.querySelector('#surprise-animal');

  const filterLabels = {
    all: 'all',
    companions: 'companion',
    meadow: 'meadow',
    desert: 'desert',
    savannah: 'savannah',
    wild: 'wild-side'
  };

  const applyFilter = (filter) => {
    let visibleCount = 0;

    residentCards.forEach((card) => {
      const shouldShow = filter === 'all' || card.dataset.category === filter;
      card.hidden = !shouldShow;
      card.classList.remove('is-featured');
      if (shouldShow) visibleCount += 1;
      if (!shouldShow) {
        const note = card.querySelector('details');
        if (note) note.open = false;
      }
    });

    filterButtons.forEach((button) => {
      const isActive = button.dataset.filter === filter;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });

    if (filterStatus) {
      const category = filterLabels[filter] || filter;
      const noun = visibleCount === 1 ? 'resident' : 'residents';
      filterStatus.textContent = filter === 'all'
        ? `Showing all ${visibleCount} royal ${noun}.`
        : `Showing ${visibleCount} ${category} ${noun}.`;
    }
  };

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => applyFilter(button.dataset.filter));
  });

  document.querySelectorAll('.field-note').forEach((note) => {
    note.addEventListener('toggle', () => {
      if (!note.open) return;
      document.querySelectorAll('.field-note[open]').forEach((otherNote) => {
        if (otherNote !== note) otherNote.open = false;
      });
    });
  });

  let previousSurprise = -1;

  surpriseButton?.addEventListener('click', () => {
    applyFilter('all');

    let nextIndex = Math.floor(Math.random() * residentCards.length);
    if (residentCards.length > 1 && nextIndex === previousSurprise) {
      nextIndex = (nextIndex + 1) % residentCards.length;
    }
    previousSurprise = nextIndex;

    const selectedCard = residentCards[nextIndex];
    const selectedNote = selectedCard.querySelector('details');
    const selectedSummary = selectedCard.querySelector('summary');

    residentCards.forEach((card) => card.classList.remove('is-featured'));
    selectedCard.classList.add('is-featured');
    if (selectedNote) selectedNote.open = true;

    selectedCard.scrollIntoView({
      behavior: reducedMotion.matches ? 'auto' : 'smooth',
      block: 'center'
    });

    window.setTimeout(() => selectedSummary?.focus({ preventScroll: true }), reducedMotion.matches ? 0 : 450);
    window.setTimeout(() => selectedCard.classList.remove('is-featured'), 2400);
  });

  const labProfiles = {
    tiger: {
      symbol: '////',
      kicker: 'STRIPE SIGNAL / 11',
      name: 'BENGAL TIGER',
      habitat: 'Forest edge',
      status: 'Moving east',
      signal: 'Strong · 92%',
      fact: 'Camera-trap photos can identify a tiger by its one-of-a-kind stripes.'
    },
    elephant: {
      symbol: ')))',
      kicker: 'RUMBLE SIGNAL / 08',
      name: 'AFRICAN ELEPHANT',
      habitat: 'Green corridor',
      status: 'Family nearby',
      signal: 'Low tone · 84%',
      fact: 'Low-frequency calls help elephant families stay connected across long distances.'
    },
    duck: {
      symbol: '≈≈≈',
      kicker: 'POND SIGNAL / 02',
      name: 'MALLARD DUCK',
      habitat: 'North pond',
      status: 'Preening',
      signal: 'Clear · 97%',
      fact: 'A waterproof outer layer keeps the duck warm while soft feathers trap insulating air.'
    },
    llama: {
      symbol: 'mmm',
      kicker: 'HUM SIGNAL / 01',
      name: 'LLAMA',
      habitat: 'High meadow',
      status: 'Herd resting',
      signal: 'Gentle · 89%',
      fact: 'A hum can carry information about comfort, curiosity or concern through the herd.'
    }
  };

  const labElements = {
    symbol: document.querySelector('#lab-symbol'),
    kicker: document.querySelector('#lab-kicker'),
    name: document.querySelector('#lab-name'),
    habitat: document.querySelector('#lab-habitat'),
    status: document.querySelector('#lab-status'),
    signal: document.querySelector('#lab-signal'),
    fact: document.querySelector('#lab-fact')
  };

  document.querySelectorAll('.lab-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      const profile = labProfiles[tab.dataset.labSpecies];
      if (!profile) return;

      document.querySelectorAll('.lab-tab').forEach((otherTab) => {
        const isActive = otherTab === tab;
        otherTab.classList.toggle('is-active', isActive);
        otherTab.setAttribute('aria-pressed', String(isActive));
      });

      Object.entries(labElements).forEach(([key, element]) => {
        if (element) element.textContent = profile[key];
      });
    });
  });

  const greetings = {
    llama: 'Hmmm hello, Your Majesty Jemoon. The llamas saved you the best mountain view.',
    duck: 'Quack! Welcome back, Your Majesty Jemoon. The pond parade is ready.',
    cat: 'A dignified purr for Your Majesty Jemoon. Your favourite windowsill is waiting.',
    dog: 'Hello, Your Majesty Jemoon! The royal welcome team has been wagging all morning.',
    crocodile: 'A very calm hello, Your Majesty Jemoon. The river is sparkling in your honour.',
    camel: 'Greetings, Your Majesty Jemoon. Your sunset caravan leaves when you are ready.',
    horse: 'Welcome, Your Majesty Jemoon. The meadow wind brought news of your arrival.',
    elephant: 'Rrrrumble hello, Your Majesty Jemoon. The whole family heard you coming.',
    giraffe: 'Hello from up here, Your Majesty Jemoon. The view across your kingdom is excellent.',
    lion: 'A royal roar for Your Majesty Jemoon. The pride kept the sunniest rock for you.',
    tiger: 'Soft paws, bright stripes: hello, Your Majesty Jemoon. The forest is listening.'
  };

  const greetingForm = document.querySelector('#greeting-form');
  const greetingSelect = document.querySelector('#greeting-animal');
  const greetingOutput = document.querySelector('#greeting-output');
  const greetingText = greetingOutput?.querySelector('p');

  greetingForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = greetings[greetingSelect.value];
    if (!message || !greetingText) return;

    greetingText.textContent = `“${message}”`;
    greetingOutput.classList.remove('is-changing');
    void greetingOutput.offsetWidth;
    greetingOutput.classList.add('is-changing');
  });

  const quizQuestions = [
    {
      question: 'WHAT DOES A CAMEL KEEP IN ITS HUMP?',
      options: ['Water', 'Energy-rich fat', 'Cool air'],
      answer: 1,
      detail: 'A camel’s hump stores fat, which can be used as an energy reserve.'
    },
    {
      question: 'WHICH RESIDENT HAS A UNIQUE STRIPE PATTERN?',
      options: ['Tiger', 'Camel', 'Duck'],
      answer: 0,
      detail: 'A tiger’s stripe pattern is as individual as a signature.'
    },
    {
      question: 'HOW CAN A HORSE DOZE?',
      options: ['Only underwater', 'Hanging from a tree', 'While standing'],
      answer: 2,
      detail: 'The stay apparatus lets a horse relax its legs while standing.'
    },
    {
      question: 'WHAT HELPS A DUCK REPEL WATER?',
      options: ['Preen oil', 'Desert dust', 'Tree sap'],
      answer: 0,
      detail: 'Ducks spread preen oil over their outer feathers.'
    }
  ];

  const quizQuestion = document.querySelector('#quiz-question');
  const quizOptions = document.querySelector('#quiz-options');
  const quizFeedback = document.querySelector('#quiz-feedback');
  const quizProgress = document.querySelector('#quiz-progress');
  const quizNext = document.querySelector('#quiz-next');
  let quizIndex = 0;

  const renderQuiz = () => {
    const currentQuestion = quizQuestions[quizIndex];
    if (!quizQuestion || !quizOptions || !quizFeedback || !quizProgress || !quizNext) return;

    quizQuestion.textContent = currentQuestion.question;
    quizProgress.textContent = `${String(quizIndex + 1).padStart(2, '0')} / ${String(quizQuestions.length).padStart(2, '0')}`;
    quizFeedback.textContent = '';
    quizNext.hidden = true;
    quizOptions.replaceChildren();

    currentQuestion.options.forEach((option, optionIndex) => {
      const button = document.createElement('button');
      button.className = 'quiz-option';
      button.type = 'button';
      button.textContent = `${String.fromCharCode(65 + optionIndex)} — ${option}`;
      button.addEventListener('click', () => answerQuiz(optionIndex));
      quizOptions.append(button);
    });
  };

  const answerQuiz = (selectedIndex) => {
    const currentQuestion = quizQuestions[quizIndex];
    const optionButtons = Array.from(quizOptions.querySelectorAll('.quiz-option'));

    optionButtons.forEach((button, optionIndex) => {
      button.disabled = true;
      if (optionIndex === currentQuestion.answer) button.classList.add('is-correct');
      if (optionIndex === selectedIndex && selectedIndex !== currentQuestion.answer) {
        button.classList.add('is-wrong');
      }
    });

    quizFeedback.textContent = selectedIndex === currentQuestion.answer
      ? `Correct. ${currentQuestion.detail}`
      : `Not this time. ${currentQuestion.detail}`;
    quizNext.textContent = quizIndex === quizQuestions.length - 1 ? 'Play again ↻' : 'Next question →';
    quizNext.hidden = false;
  };

  quizNext?.addEventListener('click', () => {
    quizIndex = (quizIndex + 1) % quizQuestions.length;
    renderQuiz();
    quizQuestion.focus?.({ preventScroll: true });
  });

  renderQuiz();

  const currentYear = document.querySelector('#current-year');
  if (currentYear) currentYear.textContent = String(new Date().getFullYear());
})();
