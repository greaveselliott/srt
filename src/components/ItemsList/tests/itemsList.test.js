import React from 'react';
import { shallow, mount } from 'enzyme';
import { ItemsList, toggleComplete, toggleFilter } from '../index';

const defaultProps = {
  items: [],
  onRemove: f => f, 
  onToggleComplete: f => f,
  onFilter: f => f,
};

describe('ItemsList', () => {
  it('renders without crashing', () => {
    shallow(<ItemsList {...defaultProps} />);
  });

  it('should display warning message if no items', () => {
    const renderedItem = shallow(<ItemsList {...defaultProps} items={[]} />);
    expect(renderedItem.find('#items-missing')).toHaveLength(1);
  });

  it('should not display warning message if items are present', () => {
    const items = [{ id: 1, content: 'Test 1' }];
    const renderedItem = shallow(<ItemsList {...defaultProps} items={items} />);
    expect(renderedItem.find('#items-missing')).toHaveLength(0);
  });

  it('should render items as list items', () => {
    const items = [{ id: 1, content: 'Test 1', complete: false, display: true }, { id: 2, content: 'Test 2', complete: false, display: true }];

    const renderedItem = shallow(<ItemsList {...defaultProps} items={items} />);
     
    expect(renderedItem.find('li')).toHaveLength(2);
    expect(renderedItem.children('button')).toHaveLength(1);
  });

  it('should render items as list items', () => {
    const items = [{ id: 1, content: 'Test 1', complete: false, display: true }, { id: 2, content: 'Test 2', complete: false, display: true }];

    const renderedItem = shallow(<ItemsList {...defaultProps} items={items} />);
    
    expect(renderedItem.find('li')).toHaveLength(2);
    expect(renderedItem.children('button')).toHaveLength(1);
  });

  it('should call onFilter event handler when the filter button is clicked', () => {
    const items = [{ id: 1, content: 'Test 1', complete: false, display: true }, { id: 2, content: 'Test 2', complete: false, display: true }];
    const spy = jest.fn();
    const renderedItem = shallow(<ItemsList {...defaultProps} items={items} onFilter={spy}/>);

    renderedItem.children('button').simulate('click');

    expect(spy).toHaveBeenCalled();
  });

  it('should return style object setting textDcoration to line through', () => {
    const mockItem = { id: 1, content: 'Test 1', complete: true, display: true };
    const mockResponse = toggleComplete(mockItem);
    expect(mockResponse).toEqual({"textDecoration":"line-through"})
  });

  it('should return style object setting textDcoration to initial', () => {
    const mockItem = { id: 1, content: 'Test 1', complete: false, display: true };
    const mockResponse = toggleComplete(mockItem);
    expect(mockResponse).toEqual({"textDecoration":"initial"})
  });


  it('should return style object setting display to none', () => {
    const mockItem = { id: 1, content: 'Test 1', complete: true, display: false };
    const mockResponse = toggleFilter(mockItem);
    expect(mockResponse).toEqual({"display":"none"})
  });

  it('should return style object setting display to block', () => {
    const mockItem = { id: 1, content: 'Test 1', complete: false, display: true };
    const mockResponse = toggleFilter(mockItem);
    expect(mockResponse).toEqual({"display":"block"})
  });
});
