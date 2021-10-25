import React from 'react';

// Type
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
  Title,
  Subtitle,
  Description,
  Primary,
  ArgsTable,
  Stories,
  PRIMARY_STORY,
} from '@storybook/addon-docs';

import { Button } from './Button';

// 애드온에서 사용될 기본 스토리 정보를 내보낸다.
export default {
  title: 'Example/Button', // '/' 로 그룹핑 한다.
  component: Button,
  args: { // 기본 수준에서 정의하면 모든 스토리에 적용된다. (각 스토리의 args가 우선순위가 더 높음)
    primary: true,
  },
  // argTypes 세세하게 지정해주면 Doc이 더 명확해진다!
  argTypes: {
    backgroundColor: {
      control: 'color',
      table: {
        category: 'Colors',
        subcategory: 'Button colors',
      }
    },
    label: {
      table: {
        category: 'Text',
      }
    },
    onClick: {
      table: {
        category: 'Events',
        // control: false, // 내용은 그대로 두고 컨트롤 비활성화
        // disable: true, // 컨트롤 비활성화
        action: 'clicked', // 처리하는 액션
        actions: ['click .btn', 'mouserover'], // 기본값은 모든 이벤트 <eventname> <selector> 형식으로 쓸수있음
      }
    },
  },
  // 파리미터는 스토리에 대한 정적 메타데이터를 정의하는 방법이다. '애드온'에 구성을 제공하는데 사용 된다.
  parameters: {
    backgrounds: { // 애드온 상단 이미지 아이콘 버튼에 추가됨
      values: [
        { name: 'red', value: '#f00' },
        { name: 'green', value: '#0f0' },
        { name: 'blue', value: '#00f' },
      ]
    },
    docs: {
      // page: null, // 애드온에서 문서 출력 안됨
      page: () => ( // 문서 출력 순서 변경
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </>
      ),
      source: {
        code: 'Some custom string here', // show code 하면 보임
        type: 'code',
      },
      description: {
        component: '설명 바꾸기!',
        story: '스토리 설명 바꾸기!'
      },
      controls: {
        sort: 'requiredFirst', // 필수 순서부터 ()
      }
    },
  },
  // 데코레이터는 스토리를 렌더링할 때 컴포넌트를 임의의 마크업으로 래핑하는 매커니즘이다.
  decorators: [
    (Story) => (
      <div style={{ margin: '3em ' }}>
        <Story />
      </div>
    )
  ],
  subcomponents: { Button }, // children
} as ComponentMeta<typeof Button>;

// 전달할 수 있는 args를 사용하기 위해 스토리에 대한 마스터 템플릿을 정의하여 패턴을 구체화 한다.
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const PrimaryButton = Template.bind({}); // bind()로 함수를 복사하여 코드 중복을 줄인다.

// args는 컴포넌트에 전달할 수 있는 유효한 값과 유형이 일치하는 문자열 키로 구성된 JSON 직렬화 가능 객체이다.
// args props 라고 생각하면 된다. 이런 저런 라이브러리에서 사용하기 때문에 args라는 명칭을 사용함
PrimaryButton.args = {
  primary: true,
  label: 'Button',
};

// 스토리 이름 바꾸기
PrimaryButton.storyName = 'My Primary Button';

export const Secondary = Template.bind({});
Secondary.args = {
  ...PrimaryButton.args,
  primary: false,
  label: 'Button',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: 'Button',
};

Large.decorators = [(Story) => <div style={{ margin: '5em'}}><Story /></div>]

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'Button',
};

Small.parameters = {
  backgrounds: {
    values: [
      { name: 'red', value: '#f00' },
      { name: 'green', value: '#0f0' },
      { name: 'black', value: '#111' },
    ],
  },
  viewport: {
    defaultViewport: 'iphonex',
  }
}
