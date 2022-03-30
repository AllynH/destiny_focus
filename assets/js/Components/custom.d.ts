// Allows TS to import SVG files:
declare module '*.svg' {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const content: any;
    export default content;
  }

  /*
  https://stackoverflow.com/questions/57127606/ts2307-cannot-find-module-images-logo-png
  */
  declare module "*.png" {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const value: any;
    export default value;
  }
