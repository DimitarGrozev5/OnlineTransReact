import produce from "@reduxjs/toolkit/node_modules/immer";
import React, { useState } from "react";
import classes from "./FAQ.module.css";

const FAQ = (props) => {
  const FAQ_content = [
    {
      heading: "Каква е целта на този сайт?",
      content: (
        <p>
          Този сайт цели да вземе най-използваните елементи от официалната
          програма на кадастъра БГСТранс и да ги направи достъпни навсякъде,
          независимо от устройството и операционната система.
        </p>
      ),
      show: false,
    },
    {
      heading: "Как работи координатната трансформация?",
      content: (
        <React.Fragment>
          <p>
            Координатните трансформации се осъществяват чрез полиномна
            трансформация от трети ред, използвайки формулите от Приложение № 11
            към чл. 26 и чл. 27 от Инструкция № РД-02-20-12 от 03 август 2012 г.
            за преобразуване на съществуващите геодезически и картографски
            материали и данни в „Българска геодезическа система 2005“.
          </p>
          <p>
            За извеждане на параметрите на трансформациите е използвана
            регулярна мрежа от точки, покриваща територията на България.
            Координатите на точките са трансформирани чрез БГС Транс(версия
            4.6). Коефициентите на полиномите са определени чрез метод на
            най-малките квадрати, изхождайки от трансформираните точки.
          </p>
        </React.Fragment>
      ),
      show: false,
    },
    {
      heading: "Каква е точността на получените координатни трансформации?",
      content: (
        <React.Fragment>
          <p>
            Предоставените точности са изчислени на база на извадка, състояща се
            от ххх на брой точки, трансформирани чрез този сайт и чрез
            БГСТранс(версия 4.6). При изчисляване на точностите се приема, че
            резултатът от БГСТранс е истинската стойност на съответната
            трансформация.
          </p>
          <p>
            <table>
              <thead>
                <tr>
                  <td>От</td>
                  <td>Към</td>
                  <td>n</td>
                  <td>
                    m<sub>x</sub>
                  </td>
                  <td>
                    m<sub>y</sub>
                  </td>
                  <td>
                    f<sub>x</sub>
                    <sup>max</sup>
                  </td>
                  <td>
                    f<sub>y</sub>
                    <sup>max</sup>
                  </td>
                  <td>
                    Sk<sub>x</sub>
                  </td>
                  <td>
                    Sk<sub>y</sub>
                  </td>
                  <td>
                    E<sub>x</sub>
                  </td>
                  <td>
                    E<sub>y</sub>
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>БГС 2005, кадастрална</td>
                  <td>КС 1970, К3</td>
                </tr>
                <tr>
                  <td>БГС 2005, кадастрална</td>
                  <td>КС 1970, К5</td>
                </tr>
                <tr>
                  <td>БГС 2005, кадастрална</td>
                  <td>КС 1970, К7</td>
                </tr>
                <tr>
                  <td>БГС 2005, кадастрална</td>
                  <td>КС 1970, К9</td>
                </tr>
                <tr>
                  <td>КС 1970, К3</td>
                  <td>БГС 2005, кадастрална</td>
                </tr>
                <tr>
                  <td>КС 1970, К5</td>
                  <td>БГС 2005, кадастрална</td>
                </tr>
                <tr>
                  <td>КС 1970, К7</td>
                  <td>БГС 2005, кадастрална</td>
                </tr>
                <tr>
                  <td>КС 1970, К9</td>
                  <td>БГС 2005, кадастрална</td>
                </tr>
              </tbody>
            </table>
          </p>
        </React.Fragment>
      ),
      show: false,
    },
    {
      heading: "Как работи височинната трансформация",
      content: (
        <React.Fragment>
          <p>
            Височинната трансформация има два аспекта - коригиране с ондулацията
            на квазигеоида и трансформация между нормални височинни системи.
          </p>
          <p>
            За определяне на разликата между геоида и квазигеоида е създадена
            регулярна мрежа от точки, покриваща територията на България.
            Изчислени са стойностите на ондулацията за всяка от точките,
            използвайки БГСТранс(версия 4.6). За изчисляване на ондулацията на
            произволна точка, се използва билинейна интерполация, на база на
            стойностите на върховете на заграждащия квадрат.
          </p>
          <p>
            За трансформиране между нормални височини в Балтийска височинна
            система и EVRS 2007, се изхожда от формулите в Приложение № 19 към
            чл. 30 от Инструкция № РД-02-20-12 от 03 август 2012 г. за
            преобразуване на съществуващите геодезически и картографски
            материали и данни в „Българска геодезическа система 2005“.
          </p>
        </React.Fragment>
      ),
      show: false,
    },
    {
      heading: "Каква е точността на получените височинни трансформации?",
      content: (
        <React.Fragment>
          <p>
            Предоставените точности са изчислени на база на извадка, състояща се
            от ххх на брой точки, трансформирани чрез този сайт и чрез
            БГСТранс(версия 4.6). При изчисляване на точностите се приема, че
            резултатът от БГСТранс е истинската стойност на съответната
            трансформация.
          </p>
          <p>
            <table>
              <thead>
                <tr>
                  <td>От</td>
                  <td>Към</td>
                  <td>n</td>
                  <td>
                    m<sub>h</sub>
                  </td>
                  <td>
                    f<sub>h</sub>
                    <sup>max</sup>
                  </td>
                  <td>Sk</td>
                  <td>E</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Геодезични височини</td>
                  <td>EVRS 2007</td>
                </tr>
                <tr>
                  <td>EVRS 2007</td>
                  <td>Балтийска</td>
                </tr>
              </tbody>
            </table>
          </p>
        </React.Fragment>
      ),
      show: false,
    },
  ];

  const [faq, setFaq] = useState(FAQ_content);

  const viewQuestionHandler = (index) => () => {
    setFaq(
      produce((draft) => {
        const prevVal = draft[index].show;
        draft.forEach((e) => (e.show = false));
        draft[index].show = !prevVal;
      })
    );
  };

  return (
    <div>
      {faq.map((e, i) => {
        return (
          <div className={classes.question} key={i}>
            <button
              className={classes.question__heading}
              onClick={viewQuestionHandler(i)}
            >
              {e.heading}
            </button>
            {e.show && (
              <div className={classes.question__content}>{e.content}</div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FAQ;
