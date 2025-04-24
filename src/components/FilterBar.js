import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSubreddit, setSort, setTime } from '../features/filter/filterSlice';
import '../styles/components/FilterBar.css';

function FilterBar() {
  const dispatch = useDispatch();
  const { subreddit, sort, time } = useSelector((state) => state.filter);

  return (
    <div className="filter-bar">
      <select value={subreddit} onChange={(e) => dispatch(setSubreddit(e.target.value))}>
        <option value="popular">r/popular</option>
        <option value="news">r/news</option>
        <option value="funny">r/funny</option>
        <option value="aww">r/aww</option>
      </select>

      <select value={sort} onChange={(e) => dispatch(setSort(e.target.value))}>
        <option value="hot">Hot</option>
        <option value="new">New</option>
        <option value="top">Top</option>
        <option value="rising">Rising</option>
      </select>

      {sort === 'top' && (
        <select value={time} onChange={(e) => dispatch(setTime(e.target.value))}>
          <option value="hour">Hour</option>
          <option value="day">Day</option>
          <option value="week">Week</option>
          <option value="month">Month</option>
          <option value="year">Year</option>
          <option value="all">All time</option>
        </select>
      )}
    </div>
  );
}

export default FilterBar;
