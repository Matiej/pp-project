export enum ButtonLabelName {
  SPINNER_TEST = 'Spinner Test',
  SECTION5_TASK = 'Section-5 Task',
  SERVER_TASK = 'Servers Task',
  USER_TASK = 'User Task',
  CLICK_TASK = 'Click Task',
  SECTION7_DIRECTIVES = 'Sectction7 Directives',
  SECTION9_TASK_USER = 'Section9 Task User',
  OUTSTANDING_TASK1 = 'Oustanding Task1',
}

export function getComponentName(buttonLabel: ButtonLabelName): string {
  switch (buttonLabel) {
    case ButtonLabelName.SPINNER_TEST:
      return 'app_spinner_test';
    case ButtonLabelName.SECTION5_TASK:
      return 'app_section5_task';
    case ButtonLabelName.SERVER_TASK:
      return 'app_servers';
    case ButtonLabelName.USER_TASK:
      return 'app_user_task';
    case ButtonLabelName.CLICK_TASK:
      return 'app_click_task';
    case ButtonLabelName.SECTION7_DIRECTIVES:
      return 'app_section7_directives';
    case ButtonLabelName.SECTION9_TASK_USER:
      return 'app_section9_task_user';
    case ButtonLabelName.OUTSTANDING_TASK1:
      return 'app_outstanding_task1';
    default:
      throw new Error("No component for button label '" + buttonLabel);
  }
}

export function getButtonLabel(componentName: string): ButtonLabelName {
  switch (componentName) {
    case 'app_spinner_test':
      return ButtonLabelName.SPINNER_TEST;
    case 'app_section5_task':
      return ButtonLabelName.SECTION5_TASK;
    case 'app_servers':
      return ButtonLabelName.SERVER_TASK;
    case 'app_user_task':
      return ButtonLabelName.USER_TASK;
    case 'app_click_task':
      return ButtonLabelName.CLICK_TASK;
    case 'app_section7_directives':
      return ButtonLabelName.SECTION7_DIRECTIVES;
    case 'app_section9_task_user':
      return ButtonLabelName.SECTION9_TASK_USER;
    case 'app_outstanding_task1':
      return ButtonLabelName.OUTSTANDING_TASK1;
    default:
      throw new Error(
        "No button label for component name '" + componentName + "'"
      );
  }
}
