import { getCookie } from "@tutu/cookie";
import SL            from "@tutu/sendlogs";

import { getBreakpointFromMedia } from "./mediaQuery";
import { PAGEID }                 from "../../const";


function getMessageForSend({ type, title, requiredFields, ...params }) {
  let missedParams = [];
  const event = {
    _type: "event",
    _eventTimeMs: +new Date()
  };

  if (requiredFields) {
    missedParams = requiredFields.filter(fieldName => params[fieldName] === undefined);
  }

  if (missedParams.length) {
    console.warn(`У события ${title} не указаны обязательные параметры: ${missedParams.join(", ")}`);
  }

  return {
    type,
    title,
    screen_width: window.innerWidth,
    screen_height: window.innerHeight,
    screen_size: getBreakpointFromMedia(),
    ...event,
    ...params
  };
}

class SendLogs {
  private _sl: SL = new SL({
    url: "//api-an.tutu.ru/userway/sendEvent",
    serverRendering: true,
    globalLogData: {
      session_id: "",
      page_id: ""
    }
  });
  private _page: string = "";

  public set instance(sendLogs: SL) {
    this._sl = sendLogs;
  }

  public set page(page: string) {
    this._page = page;

    this._sl.setGlobalLogData({
      page_id: getCookie(PAGEID)
    });
  }

  public send(params) {
    if (params.type !== "page")
      this._sl.send(getMessageForSend({
        ...params,
        page: this._page
      }));
    else
      this._sl.send(getMessageForSend(params));
  }
}

export default new SendLogs();
