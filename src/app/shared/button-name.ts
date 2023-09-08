export enum ButtonLabelName {
  SPINNER_TEST = 'Spinner Test',
  SECTION5_TASK = 'Section-5 Task',
  SERVER_TASK = 'Servers Task',
  USER_TASK = 'User Task',
  CLICK_TASK = 'Click Task',
  SECTIOIN7_DIRECTIVES = 'Sectction7 Directives',
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
    case ButtonLabelName.SECTIOIN7_DIRECTIVES:
      return 'app_section7_directives';
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
      return ButtonLabelName.SECTIOIN7_DIRECTIVES;
    default:
      throw new Error(
        "No button label for component name '" + componentName + "'"
      );
  }
}
