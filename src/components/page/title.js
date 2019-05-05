import React from 'react';
import { Link } from 'react-router-dom';


import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import SaveAlt from '@material-ui/icons/SaveAlt';
import IconButton from '@material-ui/core/IconButton';
import { getProjectNameByRoute, isAutoTests } from '../../utils/functions';
import { QUERIES } from '../../utils/constants';

const PageTitle = ({
  projectName, type, firstValue, firstText,
  secondValue, secondText, thirdValue, thirdText,
  title, link, handleDownloadFile
}) => (
  <div className="page-title">
    <div className="left-side">
      <Link to={link} className="title-link">
        <ArrowBackIos />
        <div className="title">
          {type === QUERIES.AUTO && (
            <>
              {getProjectNameByRoute(projectName)}
              {' '}
              <span>Автоматизация</span>
            </>
          )}
          {type === QUERIES.IFT && `ИФТ - ${getProjectNameByRoute(projectName)}`}
          {type === QUERIES.REGRESS && `Регресс - ${getProjectNameByRoute(projectName)}`}
          {!type && !!title && (
            <>
              {title}
              {' '}
              <span>
                Автоматизация
                {' '}
                {getProjectNameByRoute(projectName)}
              </span>
            </>
          )}
        </div>
      </Link>
    </div>
    <div className="right-side">
      {isAutoTests(type) && (
        <div className="btns">
          <IconButton onClick={handleDownloadFile}>
            <SaveAlt />
          </IconButton>
        </div>
      )}
      {firstValue !== undefined && (
        <>
          <div className="title-info">
            <span className="stat">{firstValue}</span>
            <span>{firstText}</span>
          </div>
          <div className="divider" />

        </>
      )}
      {secondValue !== undefined && (
        <>
          <div className="title-info">
            <span className="stat">{secondValue}</span>
            <span>{secondText}</span>
          </div>
          <div className="divider" />

        </>
      )}
      {thirdValue !== undefined && (
        <div className="title-info">
          <span className="stat">{thirdValue}</span>
          <span>{thirdText}</span>
        </div>
      )}
    </div>
  </div>
);

export default PageTitle;
