import section from './section'
import renderPrimitiveTest from './tests/renderPrimitiveTest'
import setStateTest from './tests/setStateTest'
import childrenTest from './tests/childrenTest'
import reconcileTest from './tests/reconcileTest'
import reduxTest from './tests/reduxTest'
import lifecycleTest from './tests/lifecycleTest'
import keyedTest from './tests/diffTests/keyedTest'
import manuallyKeyedTest from './tests/diffTests/manuallyKeyedTest'
import reorderTextNodes from './tests/diffTests/reorderTextNodes'
import unkeyedTest from './tests/diffTests/unkeyedTest'
import reorderTextNodes2 from './tests/diffTests/reorderTextNodes2'
import nestedKeyedTest from './tests/diffTests/nestedKeyedTest'
import nestedStateTest from './tests/diffTests/nestedStateTest'
// import reactReduxTest from './tests/reactReduxTest'

export default (React, { onUpdate }) => {
  const Section = section(React)
  const testGroups = [
    {
      desc: 'render tests',
      children: [
        {
          test: renderPrimitiveTest,
          desc: 'render primitive',
        },
        {
          test: childrenTest,
          desc: 'children test',
        },
      ],
    },
    {
      desc: 'setState tests',
      children: [
        {
          test: setStateTest,
          desc: 'setStateTest',
        },
        {
          test: nestedStateTest,
          desc: 'nested state test',
        },
      ],
    },
    {
      desc: 'diff tests',
      children: [
        {
          test: keyedTest,
          desc: 'keyedTest',
        },
        {
          test: nestedKeyedTest,
          desc: 'nestedKeyedTest',
        },
        {
          test: manuallyKeyedTest,
          desc: 'manuallyKeyedTest',
        },
        {
          test: unkeyedTest,
          desc: 'manuallyKeyedTest',
        },
        {
          test: reorderTextNodes,
          desc: 'reorderTextNodes',
        },
        {
          test: reorderTextNodes2,
          desc: 'reorderTextNodes2',
        },
      ],
    },
    {
      desc: 'lifecycle tests',
      children: [
        {
          test: lifecycleTest,
          desc: 'lifecycleTest',
        },
      ],
    },
    {
      desc: 'misc',
      children: [
        {
          test: reconcileTest,
          desc: 'reconcileTest',
        },
      ],
    },
    {
      desc: '3rd party integration tests',
      children: [
        {
          test: reduxTest,
          desc: 'reduxTest',
        },
        // {
        //   test: reactReduxTest,
        //   desc: 'reactReduxTest',
        // },
      ],
    },
  ]

  class App extends React.Component {
    componentDidMount() {
      onUpdate()
    }

    componentDidUpdate() {
      onUpdate()
    }

    render() {
      return (
        <div className="app">
          {testGroups.filter(group => !group.disabled).map((group, gIdx) => {
            return (
              <div className="group" key={gIdx}>
                <h2>{group.desc}</h2>
                {group.children
                  .filter(child => !child.disabled)
                  .map((child, idx) => {
                    const TestComp = child.test(React)
                    return (
                      <div key={idx} className="test">
                        <Section title={child.desc}>
                          <TestComp />
                        </Section>
                      </div>
                    )
                  })}
              </div>
            )
          })}
        </div>
      )
    }
  }
  return App
}
