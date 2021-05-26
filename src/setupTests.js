// // jest-dom adds custom jest matchers for asserting on DOM nodes.
// // allows you to do things like:
// // expect(element).toHaveTextContent(/react/i)
// // learn more: https://github.com/testing-library/jest-dom
// import '@testing-library/jest-dom/extend-expect';

// // import { render, screen } from '@testing-library/react';
// import React from 'react'
// import Enzyme, { shallow } from 'enzyme'
// import Adapter from 'enzyme-adapter-react-16'
// import isEqual from 'lodash.isequal'

// // import { countWords, onTextChanged, renderSuggestions, suggestionSelected } from './Services/QuestionData'

// // import TriviaRound from './Components/TriviaRound'

// // Configure enzyme for react 16
// Enzyme.configure({ adapter: new Adapter() })

// //function tests:

// //test for countWords:

// // export const countWords = (string) => {
// //     if (string) {
// //       return (string.split(" ").length);
// //     } else {
// //       return 0;
// //     }
// //   }

// //write a test that checks for an accurate wordcount:

// describe('accurateWordCount', () => {
//     it ('should return an integer that is equal to the wordcount', () => {
//         const testCount = countWords("Are You My Mommy?")
//         expect(testCount)
//     })
// })

// // // //function tests:

// // describe('createQuizArrayEqual', () => {
// //   it('should return an array that is equal to QUESTIONDATA', () => {
// //     const quizArray = createQuizArray()
// //     expect(isEqual(quizArray, QUESTIONDATA)).toEqual(true)
// //   })
// // })

// // describe('triviaRoundLength', () => {
// //   it('should return an array that contains 10 questions', () => {
// //     const triviaRound = getTriviaRound()
// //     expect(triviaRound.length === 10).toEqual(true)
// //   });
// // })

// // // //component tests:

// //component tests:

// // describe('TriviaRoundComponent', () => {
// //   it('should contain a Card tag', () => {
// //     const wrapper = shallow(<TriviaRound/>)
// //     expect(wrapper.containsAnyMatchingElements([
// //   <progress></progress>
// // ])).toEqual(true);
// //   })
// // })

// // // describe('Paragraph', () => {
// // //   it('should render children inside a p tag', () => {
// // //     const wrapper = shallow(<Paragraph>This is my first test</Paragraph>)
// // //     const paragraph = wrapper.find('p')
// // //     expect(paragraph).toHaveLength(1)
// // //     expect(paragraph.text()).toEqual('This is my first test')
// // //   })
// // // })

// // // // describe('Toggle', () => {
// // // //   describe('Behavioural (Integration)', () => {
// // // //     const wrapper = shallow(<Toggle />);
// // // //     it('renders a button with "Toggle" as children', () => {
// // // //       expect(wrapper.find('button')).toHaveLength(1);
// // // //     });
// // // //     it('renders "Toggled" as button children if button is clicked', () => {
// // // //       wrapper.find('button').simulate('click');
// // // //       expect(wrapper.find('button').text()).toEqual('Toggled');
// // // //     });
// // // //     it('renders "Toggle" as button children if button is clicked again', () => {
// // // //       wrapper.find('button').simulate('click');
// // // //       expect(wrapper.find('button').text()).toEqual('Toggle');
// // // //     });
// // // //   });

// // // //   describe('Component (Unit)', () => {
// // // //     const wrapper = shallow(<Toggle />);
// // // //     describe('Toggle function', () => {
// // // //       it('toggles "toggled" variable in state', () => {
// // // //         expect(wrapper.state('toggled')).toBe(false);
// // // //         wrapper.instance().toggle();
// // // //         expect(wrapper.state('toggled')).toBe(true);
// // // //       });
// // // //     });
// // // //   });
// // // // })

// // // // describe('Hooks', () => {
// // // //   const wrapper = shallow(<Hooks />);
// // // //   it('renders a button with "Toggle" as children', () => {
// // // //     expect(wrapper.find('button')).toHaveLength(1);
// // // //   });
// // // //   it('renders "Toggled" as button children if button is clicked', () => {
// // // //     wrapper.find('button').simulate('click');
// // // //     expect(wrapper.find('button').text()).toEqual('Toggled');
// // // //   });
// // // //   it('renders "Toggle" as button children if button is clicked again', () => {
// // // //     wrapper.find('button').simulate('click');
// // // //     expect(wrapper.find('button').text()).toEqual('Toggle');
// // // //   });
// // // // })

// // // describe('createQuizArrayLengthEqual', () => {
// // //   it('should return an array that is the same length as QUESTIONDATA', () => {
// // //     const quizArray = createQuizArray()
// // //     expect(quizArray.length === QUESTIONDATA.length).toEqual(true)
// // //   })
// // // })
