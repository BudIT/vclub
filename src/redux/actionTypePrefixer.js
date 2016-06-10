export default function actionTypePrefixer(prefix) {
  return (type) => `${prefix}.${type}`;
}
