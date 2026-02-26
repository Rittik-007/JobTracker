1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
  Ans: These all are element selector to acces html elements to javascript. Where getElementById selects html element with their id, getElementsByClassName selects html element with their class and querySelector or querySelectorAll both selects element with all(id, class, tagname), but querySelector selects only first child and querySelectorAll selects all.

2. How do you create and insert a new element into the DOM?
  Ans: I will use document.createElement() and then append it as a child to parent.

  const newElement = document.createElement('div');
  parentSection.appendChild('newElement');


3. What is Event Bubbling? And how does it work?
  Ans: Not clear!

4. What is Event Delegation in JavaScript? Why is it useful?
  Ans: Not clear!

5. What is the difference between preventDefault() and stopPropagation() methods?
  Ans: preventDefault() stops the default behavior of an element and stopPropagation() stops an event to bubbling up to the DOM.
