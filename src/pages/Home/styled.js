import styled from 'styled-components';

export const HomeWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(180deg, #f8fbff 0%, #eef4ff 45%, #f7f9fc 100%);
  background-size: cover;
  background-position: 0 0;

  .home-shell {
    padding: 20px 18px 28px;
  }

  p,
  span,
  div {
    font-size: 15px;
  }

  .home-header-panel {
    background: #ffffff;
    border: 1px solid #d9e8ff;
    box-shadow: 0 10px 28px rgba(20, 65, 130, 0.08);
    border-radius: 16px;
    padding: 18px;
    margin-bottom: 14px;
  }

  .home-title {
    margin: 0 !important;
    text-transform: uppercase;
    color: #0f2f61 !important;
    letter-spacing: 0.4px;
    font-weight: 700 !important;
  }

  .home-subtitle {
    color: #4c5e79;
    font-size: 13px;
  }

  .search-input {
    min-width: 320px;
    border-radius: 8px;
    height: 38px;
  }

  .home-controls {
    flex: 1;
    justify-content: flex-end;
  }

  .view-switch {
    background: #e9f1ff;
    border-radius: 10px;
    padding: 2px;
    border: 1px solid #d1e2ff;
  }

  .view-switch-btn {
    width: 34px;
    height: 32px;
    border: 0;
    background: transparent;
    color: #345b95;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
  }

  .view-switch-btn.active {
    background: #2058ba;
    color: #ffffff;
    box-shadow: 0 6px 12px rgba(32, 88, 186, 0.35);
  }

  .action-btn {
    border-radius: 8px;
    font-weight: 600;
    padding: 8px 16px;
  }

  .export-btn {
    border-color: #b9d2ff;
    color: #1d4f9e;
  }

  .stats-row {
    margin-bottom: 14px;
  }

  .metric-card {
    background: #ffffff;
    border: 1px solid #d8e6fd;
    border-radius: 14px;
    min-height: 120px;
    padding: 14px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease,
      background 0.2s ease;
    box-shadow: 0 10px 22px rgba(54, 103, 175, 0.1);
    overflow: hidden;
  }

  .metric-card-head {
    align-items: flex-start;
    gap: 8px;
  }

  .metric-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 14px 26px rgba(54, 103, 175, 0.17);
  }

  .metric-card.active {
    background: linear-gradient(160deg, #1b4a9690 0%, #2f6bc690 100%);
    border-color: transparent;
    color: #ffffff;
  }

  .metric-card.muted {
    background: linear-gradient(160deg, #1b4a96 0%, #2f6bc6 100%);
    border-color: transparent;
    color: #ffffff;
  }

  .metric-card-label {
    color: inherit;
    font-weight: 600;
    opacity: 0.92;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.35;
  }

  .metric-card-value {
    color: inherit !important;
    margin: 0 !important;
    font-size: clamp(22px, 2.1vw, 28px) !important;
    line-height: 1.2 !important;
  }

  .metric-card-caption {
    font-size: 12px;
    opacity: 0.72;
  }

  .timeline-panel {
    background: #ffffff;
    border: 1px solid #dce8fb;
    border-radius: 14px;
    padding: 14px;
    margin-bottom: 16px;
    display: grid;
    grid-template-columns: repeat(8, minmax(110px, 1fr));
    gap: 10px;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    position: relative;
  }

  .timeline-item {
    border: 1px dashed #afc7ed;
    border-radius: 12px;
    padding: 10px;
    background: #f7fbff;
    position: relative;
    min-width: 110px;
    scroll-snap-align: start;
  }

  .timeline-year {
    font-weight: 700;
    color: #1f4f97;
    margin-bottom: 8px;
  }

  .timeline-dot {
    width: 10px;
    height: 10px;
    background: #245ebc;
    border-radius: 50%;
    margin-bottom: 8px;
  }

  .timeline-line {
    position: absolute;
    top: 60px;
    width: 100%;
    height: 1px;
    border: 1px dashed #afc7ed50;
    z-index: 2;
  }

  .timeline-value {
    font-weight: 700;
    color: #103a78;
  }

  .project-card {
    background: #ffffff;
    border-radius: 12px;
    padding: 14px;
    border: 1px solid #dce8fb;
    box-shadow: 0 12px 24px rgba(58, 93, 146, 0.12);
    display: flex;
    flex-direction: column;
    gap: 10px;
    height: 100%;
  }

  .project-card-header {
    padding-bottom: 10px;
    border-bottom: 1px solid #e4edf9;
  }

  .project-short-name {
    font-weight: 700;
    color: #23416d;
    font-size: 16px;
  }

  .project-contract-number {
    max-width: 66%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    color: #6f8198;
    font-weight: 600;
  }

  .project-title-text {
    font-weight: 600;
    color: #162f57;
    line-height: 1.5;
    line-clamp: 4;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .project-tags-wrap {
    min-height: 26px;
  }

  .project-metric-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #ecf2fb;
    padding-top: 8px;
    color: #475b79;
  }

  .project-metric-value {
    color: #1f4b93 !important;
  }

  .project-card-footer {
    margin-top: auto;
  }

  .table-wrapper {
    background: #ffffff;
    border-radius: 12px;
    border: 1px solid #dbe8fc;
    overflow: hidden;
    box-shadow: 0 10px 22px rgba(58, 93, 146, 0.1);
  }

  .table-wrapper.card-mode {
    padding: 16px;
  }

  .title-with-count {
    font-weight: 700;
    color: #1f4f97;
    margin-bottom: 12px;
    font-size: 18px;
  }

  .table-project-cell {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .table-task-hint {
    color: #1d4fa2;
    font-weight: 600;
  }

  .ant-divider {
    margin-top: 8px;
    margin-bottom: 10px;
  }

  .ant-divider-with-text::after,
  .ant-divider-with-text::before {
    border-color: #b8d0f5;
  }

  .ant-divider-inner-text {
    font-weight: 600;
  }

  @media (max-width: 992px) {
    .home-shell {
      padding: 14px 12px 20px;
    }

    .search-input {
      min-width: 240px;
    }

    .home-controls {
      justify-content: flex-start;
      width: 100%;
    }

    .metric-card-value {
      font-size: 21px !important;
    }

    .timeline-panel {
      grid-auto-flow: column;
      grid-template-columns: unset;
      grid-auto-columns: minmax(120px, 1fr);
    }

    .table-wrapper.card-mode {
      padding: 12px;
    }
  }

  @media (max-width: 576px) {
    .search-input {
      min-width: 100%;
    }

    .action-btn {
      width: calc(50% - 5px);
    }

    .view-switch {
      order: 3;
    }

    .timeline-item {
      min-width: 100px;
    }

    .title-with-count {
      font-size: 16px;
    }
  }
`;

export const CenterBlock = styled.div`
  border-radius: 16px;
  padding: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CenterContent = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 10px 6px 16px 10px;
  padding-top: 40px;
  position: relative;

  .ant-btn > span {
    font-weight: 600;
    letter-spacing: 0.3px;
  }
`;

export const IconBlock = styled.div`
  position: absolute;
  left: 20px;
  top: -30px;
  height: 60px;
  width: 60px;
  border-radius: 9999px;
  background: #fff;
  box-shadow: 2px 4px 10px 2px rgba(13, 71, 161, 0.2);
  /* transform: translateX(-50%); */
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LogoutBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
