/**
 * Find Yandex in window, or create new instance
 *
 * @returns {*}
 */
export default class YandexMetrika {
  private _counter;

  constructor(params, useInWindow) {
    this._counter = new Promise(async(res) => {
      const Ya = await this._load();
      const counterInWindow = window['yaCounter' + params.id];

      if (useInWindow && counterInWindow) {
        res(counterInWindow);
      } else if (Ya) {
        res(new (<any>Ya)(params));
      }
    });
  }

  reachGoal(goal, params: Object | undefined = undefined) {
    if (this._counter) {
      return new Promise(res => {
        this._counter.then(counter => {
          counter.reachGoal(goal, params);
          res();
        });
      });
    }
    return;
  }

  hit(url, params) {
    if (this._counter) {
      return new Promise(res => {
        this._counter.then(counter => {
          counter.hit(url, params);
          res();
        });
      });
    }
    return;
  }

  _load() {
    return new Promise(res => {
      let interval;

      if ((<any>window).Ya) {
        res((<any>window).Ya.Metrika);
      } else {
        /**
         * FIXME Не самое лучшее ршение, но, пока единственное рабочее.
         * TODO доисследовать.
         *
         * Пытался добавить cb в метрику, но он меня игнорирует.
         * попытка была добавлять в yandex-metrika-callbacks, которая не увенчалась успехом
         *
         * также пробовал yaсounter7294060inited,
         * но он не работает, потому что должен стоять triggerEvent: true которого нет.
         *
         * При попытке его поставить получил ответ
         *
         *     "Аргумент очень прост - будем перестраивать счетчики и этот триггер  потеряется,
         *      т.к является нашей нахлобучкой, а не дефолтным свойством счетчика.
         *      Потом, если ставить этот триггер, то и на основной счетчик тоже - а туда уж точно
         *      не надо ничего лишнего"
         *
         *
         * Так происходит ровно потому, что скрипт добавляется чезез gtm, и поймать его проблемно
         * Если бы скрипт добавляли через наш код, то проблем бы не было.
         *
         *
         * Трогает window за Ya каждые 100 милисекунд, до тех пор пока не нащупает.
         * Если не найдем за 3 секунды, забываем!
         *
         * Получил аппрув от Романа Грунтовича
         */
        Promise.race([
          new Promise(result => setTimeout(result, 3000)),
          new Promise(result => {
            interval = setInterval(() => { if ((<any>window).Ya) { return result(); } }, 100);
          }),
        ]).then(() => {
          clearInterval(interval);
          if ((<any>window).Ya) {
            res((<any>window).Ya.Metrika);
          } else {
            res(undefined);
          }
        });
      }
    });
  }

}
