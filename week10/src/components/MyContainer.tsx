//import React from 'react';
import { useTranslation } from 'react-i18next';

function MyContainer() {

  const { t } = useTranslation();


  return (
    <div>
        <h1>{t("This is the front page")}</h1>
    </div>
  );
};

export default MyContainer;