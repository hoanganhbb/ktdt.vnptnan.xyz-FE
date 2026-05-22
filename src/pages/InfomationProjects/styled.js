import styled from 'styled-components';

export const InfomationProjectsWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(180deg, #f5f9ff 0%, #edf4ff 45%, #f8fbff 100%);
  padding: 20px 18px 28px;

  .project-shell {
    background: #ffffff;
    border-radius: 14px;
    padding: 12px 14px 14px;
    border: 1px solid #d7e5ff;
    box-shadow: 0 12px 26px rgba(44, 82, 130, 0.15);
  }

  .project-header {
    padding: 4px 2px;
  }

  .project-header-left {
    flex: 1;
    min-width: 240px;
  }

  .back-btn,
  .edit-btn,
  .file-item {
    border: 0;
    background: transparent;
    cursor: pointer;
  }

  .back-btn {
    width: 36px;
    height: 36px;
    min-width: 36px;
    border-radius: 10px;
    border: 1px solid #c6dafb;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f1f7ff;
  }

  .project-title {
    margin: 0 !important;
    color: #2c5282 !important;
    line-height: 1.3 !important;
  }

  .project-actions {
    padding-right: 4px;
  }

  .edit-btn {
    width: 34px;
    height: 34px;
    border-radius: 10px;
    background: #eaf2ff;
    border: 1px solid #c7daf9;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .project-divider {
    background: #e2e8f0;
    height: 1px;
    margin: 6px 0 12px;
  }

  .info-grid {
    margin-bottom: 16px;
  }

  .info-card {
    background: #ffffff;
    border: 1px solid #e1ebf9;
    border-radius: 12px;
    padding: 12px;
    height: 100%;
    box-shadow: 0 8px 18px rgba(44, 82, 130, 0.08);
  }

  .info-line {
    padding: 7px 0;
    border-bottom: 1px solid #edf2f8;
    align-items: flex-start;
  }

  .info-line:last-child {
    border-bottom: 0;
  }

  .info-line .label {
    font-weight: 600;
    color: #34507a;
    min-width: 132px;
  }

  .info-line .value {
    color: #1f2937;
    text-align: right;
    flex: 1;
  }

  .info-line.strong .value {
    font-weight: 700;
    color: #1d4f9d;
  }

  .file-card-title {
    font-weight: 700;
    color: #2c5282;
    margin-bottom: 10px;
  }

  .file-item {
    width: 100%;
    text-align: left;
    padding: 8px;
    margin-bottom: 8px;
    border-radius: 10px;
    border: 1px solid #e3ecfa;
    background: #f8fbff;
    transition: background 0.2s ease;
  }

  .file-item:hover {
    background: #eef5ff;
  }

  .file-name {
    color: #1f3e6f;
    font-weight: 500;
  }

  .step-header {
    display: flex;
    gap: 12px;
    align-items: center;
    padding: 10px;
    border-radius: 12px;
    background: linear-gradient(135deg, #eef5ff 0%, #f7fbff 100%);
    border: 1px solid #d8e6fb;
    margin-bottom: 10px;
  }

  .step-current-number {
    min-width: 32px;
    height: 32px;
    border-radius: 8px;
    background: #2c5282;
    color: #fff;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .step-header-label {
    color: #4a6080;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }

  .step-header-name {
    color: #163b74;
    font-weight: 700;
    line-height: 1.3;
  }

  .project-steps-timeline .ant-timeline-item {
    padding-bottom: 14px;
  }

  .project-step-dot {
    width: 28px;
    height: 28px;
    min-width: 28px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 700;
    border: 2px solid;
    background: #fff;
  }

  .project-step-dot.done {
    border-color: #2f855a;
    color: #2f855a;
    background: #f0fff4;
  }

  .project-step-dot.current {
    border-color: #2c5282;
    color: #fff;
    background: #2c5282;
    transform: scale(1.08);
  }

  .project-step-dot.upcoming {
    border-color: #c8d3e3;
    color: #90a0b8;
    background: #f7f9fc;
  }

  .project-step-item.done .project-step-name {
    color: #1f4f3a;
    opacity: 1;
    font-weight: 600;
  }

  .project-step-item.current .project-step-name {
    color: #153d7a;
    font-size: 17px;
    font-weight: 800;
    opacity: 1;
  }

  .project-step-item.upcoming .project-step-name {
    color: #7f8da3;
    opacity: 0.55;
    font-weight: 500;
  }

  .project-step-name {
    display: inline-block;
    line-height: 1.35;
    transition: all 0.2s ease;
  }

  .bottom-grid {
    margin-top: 6px;
  }

  .quote-card {
    font-weight: 500;
    text-align: justify;
    font-size: 15px;
    color: #2d4f86;
    line-height: 1.55;
    background: #ffffff;
    padding: 14px 12px 12px;
    border: 1px solid #d4e1f5;
    border-radius: 12px;
    position: relative;
    height: 100%;
    /* margin-top: 16px; */
  }

  .alert-card {
    background-color: #ffe5e5;
    border: 1px solid #f8b4b4;
    border-radius: 12px;
    overflow: hidden;
  }

  .alert-title {
    color: #ffffff;
    padding: 10px 12px;
    font-weight: 700;
    background: #f56565;
  }

  .alert-content {
    padding: 12px;
    font-weight: 500;
    color: #6b1f1f;
  }

  @media (max-width: 768px) {
    .project-shell {
      padding: 10px;
    }

    .project-title {
      font-size: 20px !important;
    }

    .info-line .label {
      min-width: 110px;
      font-size: 14px;
    }

    .info-line .value {
      font-size: 14px;
    }

    .step-current-number {
      min-width: 38px;
      height: 38px;
    }

    .project-step-item.current .project-step-name {
      font-size: 15px;
    }
  }
`;
