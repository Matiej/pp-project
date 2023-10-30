export enum ButtonLabelName {
  SPINNER_TEST = 'Spinner Test',
  SECTION5_TASK = 'Section-5 Task',
  SERVER_TASK = 'Servers Task',
  USER_TASK = 'User Task',
  CLICK_TASK = 'Click Task',
  SECTION7_DIRECTIVES = 'Sectction7 Directives',
  SECTION9_TASK_USER = 'Section9 Task User',
  OUTSTANDING_TASK1 = 'Oustanding Task1',
  SECTION11_ROUTING = 'Section11 Routing',
  CUSTOM_OBSERVABLES = 'Custom Observables',
  SECTION15_FORMS = 'Section15 Forms',
  SECTION15_TASK6 = 'Section15 Task-6',
  EXAMPLE_REACTIVE_FORM = 'Reactive Form',
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
    case ButtonLabelName.SECTION11_ROUTING:
      return 'app_section11_routing';
    case ButtonLabelName.CUSTOM_OBSERVABLES:
      return 'app_custom_observables';
    case ButtonLabelName.SECTION15_FORMS:
      return 'app_section15_forms';
    case ButtonLabelName.SECTION15_TASK6:
      return 'app_section15_task6';
    case ButtonLabelName.EXAMPLE_REACTIVE_FORM:
      return 'app_example_reactive_form';
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
    case 'app_section11_routing':
      return ButtonLabelName.SECTION11_ROUTING;
    case 'app_custom_observables':
      return ButtonLabelName.CUSTOM_OBSERVABLES;
    case 'app_section15_forms':
      return ButtonLabelName.SECTION15_FORMS;
    case 'app_section15_task6':
      return ButtonLabelName.SECTION15_TASK6;
    case 'app_example_reactive_form':
      return ButtonLabelName.EXAMPLE_REACTIVE_FORM;
    default:
      throw new Error(
        "No button label for component name '" + componentName + "'"
      );
  }
}
