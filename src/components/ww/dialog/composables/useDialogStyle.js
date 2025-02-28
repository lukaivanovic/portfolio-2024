export function useDialogStyle() {
  function getTransitionName(animation, slideInDirection) {
    return animation + "-transition";
  }

  function getModalStyle(side, align, customPositionX, customPositionY) {
    const style = {
      position: "absolute",
    };

    switch (side) {
      case "left":
        style.left = 0;
        break;
      case "right":
        style.right = 0;
        break;
      case "custom":
        style.left = customPositionX;
        break;
      default:
        style.left = "50%";
        style["--translate-x"] = "-50%";
        break;
    }

    switch (align) {
      case "top":
        style.top = 0;
        break;
      case "bottom":
        style.bottom = 0;
        break;
      case "custom":
        style.top = customPositionY;
        break;
      default:
        style.top = "50%";
        style["--translate-y"] = "-50%";
        break;
    }

    return style;
  }

  function getSheetStyle(side) {
    const style = {
      position: "absolute",
    };

    switch (side) {
      case "left":
        Object.assign(style, {
          height: "100%",
          top: 0,
          bottom: 0,
          left: 0,
        });
        break;
      case "right":
        Object.assign(style, {
          height: "100%",
          top: 0,
          bottom: 0,
          right: 0,
        });
        break;
      case "top":
        Object.assign(style, {
          width: "100%",
          top: 0,
          left: 0,
          right: 0,
        });
        break;
      case "bottom":
        Object.assign(style, {
          width: "100%",
          bottom: 0,
          left: 0,
          right: 0,
        });
        break;
      default:
        Object.assign(style, {
          height: "100%",
          top: 0,
          bottom: 0,
          right: 0,
        });
        break;
    }
    console.log(style);

    return style;
  }

  return {
    getModalStyle,
    getSheetStyle,
    getTransitionName,
  };
}
