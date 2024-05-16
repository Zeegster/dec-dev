import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { i1, i2 } from '../assets/base64/store';
import React from 'react';
export const useQuestions = create((set) => ({
  QStore: [
    {
      id: 0,
      question:
        'Методы сборки, предусматривающие сборку и сварку отдельных узлов, из которых состоит конструкция, а затем сборка и сварка самой конструкции',
      value: 100,
      options: [
        {
          id: 'A',
          text: 'Метод узловой сборки',
          isCorrect: true,
        },
        {
          id: 'B',
          text: 'Метод рациональной сборки',
          isCorrect: false,
        },
        {
          id: 'C',
          text: 'Метод общей сборки',
          isCorrect: false,
        },
        {
          id: 'D',
          text: 'Метод оптимальной сборки',
          isCorrect: false,
        },
      ],
    },{
      id: 1,
      question: 'Какой способ сборки применяется при единичном производстве?',
      value: 150,
      options: [
        {
          id: 'A',
          text: 'С неполной взаимозаменяемостью',
          isCorrect: false,
        },
        {
          id: 'B',
          text: 'С подгонкой деталей',
          isCorrect: true,
        },
        {
          id: 'C',
          text: 'С полной взаимозаменяемостью',
          isCorrect: false,
        },
        {
          id: 'D',
          text: 'Все перечисленные варианты',
          isCorrect: false,
        },
      ],
    },{
      id: 2,
      question: 'Какой способ сборки применяется при серийном производстве?',
      value: 200,
      options: [
        {
          id: 'A',
          text: 'С неполной взаимозаменяемостью',
          isCorrect: false,
        },
        {
          id: 'B',
          text: 'С подгонкой деталей',
          isCorrect: false,
        },
        {
          id: 'C',
          text: 'С полной взаимозаменяемостью',
          isCorrect: true,
        },
        {
          id: 'D',
          text: 'Все перечисленные варианты',
          isCorrect: false,
        },
      ],
    },
    // {
    //   id: 2,
    //   question:
    //     'Описание технологического процесса выполняется на специальных бланках, которые называются:',
    //   value: 200,
    //   options: [
    //     {
    //       id: 'A',
    //       text: 'Технологическая карта',
    //       isCorrect: true,
    //     },
    //     {
    //       id: 'B',
    //       text: 'Технологическая последовательность',
    //       isCorrect: false,
    //     },
    //     {
    //       id: 'C',
    //       text: 'Технологическая ведомость',
    //       isCorrect: false,
    //     },
    //     {
    //       id: 'D',
    //       text: 'Техническая карта',
    //       isCorrect: false,
    //     },
    //   ],
    // },
    {
      id: 3,
      question:
        'Способность однородных и разнородных металлов и сплавов образовывать сварные соединения  это…: ',
      value: 250,
      options: [
        {
          id: 'A',
          text: 'Свариваемость',
          isCorrect: true,
        },
        {
          id: 'B',
          text: 'Технологичность',
          isCorrect: false,
        },
        {
          id: 'C',
          text: 'Конструктивность',
          isCorrect: false,
        },
        {
          id: 'D',
          text: 'Технические характеристики',
          isCorrect: false,
        },
      ],
    },
    {
      id: 4,
      type: 'draglist',
      question:
        'Определить правильную последовательность принципиальной схемы технологического процесса',
      value: 100,
      options: [
        { id: 0, textorder: '1', text: 'Механическая сборка' },
        { id: 1, textorder: '2', text: 'Сварка' },
        { id: 2, textorder: '3', text: 'Заготовительные работы' },
        { id: 3, textorder: '4', text: 'Контроль качества' },
        { id: 4, textorder: '5', text: 'Правка' },
        { id: 5, textorder: '6', text: 'Сборка и контроль сборки' },
        { id: 6, textorder: '7', text: 'Термическая обработка' },
        { id: 7, textorder: '8', text: 'Подготовка поверхности' },
        // Неупорядоченный словать ответов в формате text1: text2
        // text1 и text2 - строки из полей text из двух предыдущих списков соответственно
        {
          answer: [
            'Заготовительные работы',
            'Подготовка поверхности',
            'Сборка и контроль сборки',
            'Сварка',
            'Термическая обработка',
            'Правка',
            'Механическая сборка',
            'Контроль качества',
          ],
        },
      ],
    },
    {
      id: 5,
      question: 'Описание технологического процесса выполняется на специальных бланках, которые называются:',
      value: 150,
      options: [
        {
          id: 'A',
          text: 'Технологическая карта',
          isCorrect: true,

        },
        {
          id: 'B',
          text: 'Технологическая последовательность',
          isCorrect: false,
        },
        {
          id: 'C',
          text: 'Технологическая ведомость',
          isCorrect: false,

        },
        {
          id: 'D',
          text: 'Техническая карта',
          isCorrect: false,
        },
      ],
    },
    {
      id: 6,
      question:
        'Определить технологическую последовательность сборки сварной конструкции',
      value: 200,
      options: [
        {
          id: 'A',
          text: 'Установка в сборочном приспособлении; подача деталей к месту сборки; фиксация.',
          isCorrect: false,
        },
        {
          id: 'B',
          text: 'Фиксация; сварка; установка в сборочном приспособлении; подача деталей к месту сборки.',
          isCorrect: false,
        },
        {
          id: 'C',
          text: 'Подача деталей к месту сборки; установка в сборочном приспособлении; фиксация; сварка.',
          isCorrect: true,
        },
        {
          id: 'D',
          text: 'Сварка; установка в сборочном приспособлении; подача деталей к месту сборки; фиксация.',
          isCorrect: false,
        },
      ],
    },{
      id: 7,
      question:
        'Дополните список сварных соединений. Стыковые,Угловые,Тавровые,Нахлесточные',
      value: 250,
      options: [
        {
          id: 'A',
          text: 'Параллельные',
          isCorrect: false,
        },
        {
          id: 'B',
          text: 'Боковые',
          isCorrect: false,
        },
        {
          id: 'C',
          text: 'Торцевые',
          isCorrect: true,
        },
        {
          id: 'D',
          text: 'Точечные',
          isCorrect: false,
        },
      ],
    },
    {
      id: 8,
      question: 'Выберите способ сварки представленный на рисунке',
      value: 100,
      content: (
        <>
          <img
            width={300}
            src={i1}
            alt=''
          />
        </>
      ),
      options: [
        {
          id: 'A',
          text: 'Сварка под флюсом',
          isCorrect: false,
        },
        {
          id: 'B',
          text: 'Плазменная сварка',
          isCorrect: false,
        },
        {
          id: 'C',
          text: 'Контактная сварка',
          isCorrect: true,
        },
        {
          id: 'D',
          text: 'Сварка рением',
          isCorrect: false,
        },
      ],
    },
    {
      id: 9,
      question: 'Определите расположение шва в пространстве',
      value: 150,
      content: <img src={i2}></img>,
      options: [
        {
          id: 'A',
          text: 'Нижнее стыковое',
          isCorrect: false,
        },
        {
          id: 'B',
          text: 'Вертикальное стыковое',
          isCorrect: false,
        },
        {
          id: 'C',
          text: 'Горизонтальное стыковое',
          isCorrect: true,
        },
        {
          id: 'D',
          text: 'Влодочку стыковое',
          isCorrect: false,
        },
      ],
    },
    {
      id: 10,
      question:
        'Следующим этапом после формальной экспертизы является публикация сведений о заявке на изобретение, которая проводится по истечении ______ месяцев с момента подачи заявки. ',
      value: 200,
      options: [
        {
          id: 'A',
          text: '10',
          isCorrect: false,
        },
        {
          id: 'B',
          text: '18',
          isCorrect: true,
        },
        {
          id: 'C',
          text: '12',
          isCorrect: false,
        },
        {
          id: 'D',
          text: '9',
          isCorrect: false,
        },
      ],
    },
    {
      id: 11,
      question:
        'В объективном смысле авторское право — это подотрасль гражданского права, которая регулирует отношения по созданию, использованию и охране прав на_____',
      value: 250,
      options: [
        {
          id: 'A',
          text: 'произведения науки',
          isCorrect: false,
        },
        {
          id: 'B',
          text: 'произведения науки, литературы и искусства',
          isCorrect: true,
        },
        {
          id: 'C',
          text: 'литературы и искусства',
          isCorrect: false,
        },
        {
          id: 'D',
          text: 'Учебные науки',
          isCorrect: false,
        },
      ],
    },
    {
      id: 12,
      question: 'Укажите гост на ручную дуговую сварку',
      value: 100,
      options: [
        {
          id: 'A',
          text: 'ГОСТ 5624-90',

          isCorrect: false,
        },
        {
          id: 'B',
          text: 'ГОСТ 5264-80',
          isCorrect: true,
        },
        {
          id: 'C',
          text: 'ГОСТ 5642-80',

          isCorrect: false,
        },
        {
          id: 'D',
          text: 'ГОСТ 5264-90',

          isCorrect: false,
        },
      ],
    },
    {
      id: 13,
      question:
        'В современной технике широко применяются _____ для получения наплавленного металла с заданными специальными свойствами по износостойкости, твердости, химической активности. Введите пропущенное словосочетание',
      value: 150,
      type: 'input',
      options: [
        {
          id: 0,
          answer: 'твердыесплавы',
        },
      ],
    },{
      id: 14,
      question: '__________________ и ___________________ элементы предназначены связать порошковые материалы покрытия электрода в однородную массу, сцементировать покрытие на электродном стержне, чтобы после высыхания оно имело нужную прочность.',
      value: 200,
      options: [
        {
          id: 'A',
          text: 'Сухие и прочные',

          isCorrect: false,
        },
        {
          id: 'B',
          text: 'Связующие и цементирующие',
          isCorrect: true,
        },
        {
          id: 'C',
          text: 'Цементирующие и однородные',

          isCorrect: false,
        },
        {
          id: 'D',
          text: 'Стержневые и связующие',

          isCorrect: false,
        },
      ],
    },
  ],

  correctAnswers: [],
  unCorrectAnswer: [],

  answerQuestion: (answer) =>
    set((state) => ({
      correctAnswers: [...state.correctAnswers, answer],
    })),

  unCorrect: (answer) =>
    set((state) => ({
      unCorrectAnswer: [...state.unCorrectAnswer, answer],
    })),
}));

export const useScore = create(
  persist(
    (set) => ({
      score: 0,
      attempt: 10,

      getScore: (value) => set((state) => ({ score: state.score + value })),
      clearScore: () => {
        localStorage.removeItem('score-storage');
      },
    }),
    { name: 'score-storage' }
  )
);

export const useTimer = create(
  persist(
    (set, get) => ({
      timer: 0,
      interval: null,

      finishedTask: () => {
        window.activeTimer = null;
        set({ interval: null });
        localStorage.removeItem('timer-storage');
      },

      startTimer: () => {
        if (!window.activeTimer) {
          const interval = setInterval(() => {
            set((state) => ({
              timer: state.timer + 1,
            }));
          }, 1000);
          set({ interval: interval });
          window.activeTimer = true;
        }

        if (
          JSON.parse(localStorage.getItem('score-storage')).state.score >= 1550
        ) {
          clearInterval(get().interval);
          set({ interval: 'finished' });
        }
      },

      formatTimer: (timer) => {
        let minutes = Math.floor(timer / 60);
        let seconds = timer % 60;
        minutes = String(minutes).padStart(2, '0');
        seconds = String(seconds).padStart(2, '0');
        return `${minutes}:${seconds}`;
      },

      stopTimer: () => {
        clearInterval(get().interval);
        set({ interval: 'finished' });
      },

      clearTimer: () => {
        set({ timer: 0 });
        localStorage.removeItem('timer-storage');
      },
    }),
    { name: 'timer-storage' }
  )
);

