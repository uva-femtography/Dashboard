import {Toaster, Position} from "@blueprintjs/core";

const AppToaster = Toaster.create({
    position: Position.TOP,
});

export function showError(message: string) {
    AppToaster.show({ message: message, intent: "danger" });
}

export function getTabSelected() {
    let tabSelected = sessionStorage.getItem("tab");

    //If the tab selected is in valid, i.e. whether if the tab is null or if the
    //tab selected is instructions
    if (tabSelected === null) {
      showError("Error: No Tab Selected");
      return null;
    } else if (tabSelected === "instructions") {
      showError("Error: Cannot plot on instructions");
      return null;
    }

    let index = parseInt(tabSelected.charAt(tabSelected.length - 1));
    if (document.getElementById(`results-${index}`) === null) {
      AppToaster.show({ message: "Error: No Tab Selected", intent: "danger" });
      return null;
    }

    return index;
  }