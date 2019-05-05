import React from 'react';
import classNames from 'classnames';
import { pure } from 'recompose';


const Chunk = pure(({
  tests, total, num, startDate, endDate, active
}) => (
  <div
    className={classNames({
      'auto-chunk': true,
      hidden: !active
    })}
    style={{ flexGrow: tests / (total) * 100 }}
  >
    {active && (
      <div className="chunk-tooltip">
        <span className="title">Новых автотестов</span>
        <span className="test-num">{tests}</span>
        <span className="sprint-num">
          {`Спринт ${num}`}
        </span>
        <span className="sprint-dates">
          {`${startDate} : ${endDate}`}
        </span>
      </div>
    )}
  </div>
));

const ChartChunk = pure(({ sprintTests, total }) => (
  <div className="chunks">
    {sprintTests.map(i => i.automated !== 0
          && (
          <Chunk
            key={i.sprint.id}
            tests={i.automated}
            total={total}
            num={i.id}
            startDate={i.sprint.startDate}
            endDate={i.sprint.endDate}
            active={i.show}
          />
          ))}
  </div>
));

export default ChartChunk;
