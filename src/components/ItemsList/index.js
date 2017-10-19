import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeItem, toggleCompleteItem, filterUncompleteItem } from '../../logic/actions';
import './styles.css';

export const ItemsList = ({ items, onRemove, onToggleComplete, onFilter }) => {
  return (
    <div>
      <button onClick={() => { onFilter()}}>Filter complete</button>
      <ul className={'itemsList-ul'}>
        {items.length < 1 && <p id={'items-missing'}>Add some tasks above.</p>}
        {items.map(item => <li key={item.id} style={toggleFilter(item)}><span style={toggleComplete(item)} onClick={() => { onToggleComplete(item); }}>{item.content}</span><button onClick={() => { onRemove(item); }}>x</button></li>)}
      </ul>
    </div>
  );
};

export const toggleComplete = (item) => {
  return { textDecoration: item.complete ? "line-through": "initial" };
};

export const toggleFilter = (item) => {
  return { display: item.display ? "block" : "none"};
};

ItemsList.propTypes = {
  items: PropTypes.array.isRequired,
  onRemove: PropTypes.func.isRequired,
  onToggleComplete: PropTypes.func.isRequired,
  onFilter: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onRemove: item => dispatch(removeItem(item)),
  onToggleComplete: item => dispatch(toggleCompleteItem(item)),
  onFilter: () => dispatch(filterUncompleteItem()),
});

const mapStateToProps = state => {
  return { items: state.todos.items };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemsList);
