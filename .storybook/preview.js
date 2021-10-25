import React from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'; // 추가 애드온 설정

// 전역 파라미터 (우선 순위 가장 낮음) (모든 파라미터 프로퍼티는 각각의 스토리 arg로 사용가능)
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" }, // 자동으로 추론
  layout: 'centered', // 글로벌 레이아웃 지정 centered, fullscreen, padded(default)
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
    expanded: true, // 컨트롤에 문서항목이 모두 표시됨
    presetColors: [ // 사전 지정 컬러
      { color: '#ff4785', title: 'Coral' },
      '#fe4a49',
    ]
  },
  // 배경에 사용할 색 지정
  backgrounds: {
    default: 'red',
    values: [
      { name: 'red', value: '#f00' },
      { name: 'green', value: '#0f0' },
    ]
  },
  options: {
    // 스토리 정렬하기
    storySort: (a, b) => a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, undefined, { numeric: true }),
    // storySort: {
    //   method: '', 정렬 방법 (ex 'alphabetical')
    //   order: [], 여기에 제공된 순서대로 이름이 표시됨 (ex ['Intro', 'Pages', ['Home', 'Login'], 'Components', '*'])
    //   locales: '', 표시해야하는 로케일 기본 en-US
    //   includeName: false, 정렬 계산에 스토리 이름 포함 여부
    // }
  },
  // 뷰포트 설정
  viewport: {
    viewports: INITIAL_VIEWPORTS, // 기본 폰리스트 제공 (왜 병합이 안되는지 모름..)
    defaultViewport: 'iphone6',
  }
}

const customViewports = {
  kindleFire2: {
    name: 'Kindle Fire 2',
    styles: {
      width: '600px',
      height: '963px',
    },
    type: 'tablet',
  },
  kindleFireHD: {
    name: 'Kindle Fire HD',
    styles: {
      width: '533px',
      height: '801px',
    },
    type: 'tablet',
  },
};


const GlobalStyle = createGlobalStyle`
  font-size: 16px;
`

// 전역 데코레이터
export const decorators = [
  (Story) => (
    <ThemeProvider theme={{ theme: 'default' }}>
      <GlobalStyle />
      <Story />
    </ThemeProvider>
  )
]

// 또는
const getTheme = (themeName) => {
  return themeName;
}

const withThemeProvider = (Story, context) => {
  const theme = getTheme(context.globals.theme);
  return (
    <ThemeProvider theme={theme}>
      <Story {...context} />
    </ThemeProvider>
  )
}

export const decorators2 = [withThemeProvider];

