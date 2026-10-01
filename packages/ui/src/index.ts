// Theme
export { themeClass, vars } from "./styles/theme.css";

// Components
export { Button, buttonStyles, type ButtonProps } from "./components/Button/Button";
export { Card, type CardProps } from "./components/Card/Card";
export { Header, type HeaderProps } from "./components/Header/Header";
export { Input, type InputProps } from "./components/Input/Input";
export { Spinner, type SpinnerProps } from "./components/Spinner/Spinner";

// Other entry points (see package.json "exports"):
//   "@shopflow/ui/global-styles" - import once in the app root layout.
//   "@shopflow/ui/theme"         - use `vars` inside *.css.ts files without
//                                  pulling React components into style builds.
