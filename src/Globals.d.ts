declare module "*.css";
declare module "*.module.css";
declare module "*.svg" {
    const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
}