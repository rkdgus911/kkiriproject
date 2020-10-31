import Joi from "joi";
import Calendar from "../../models/calendar";

// 스케쥴 CRUD
export const createSchedule = async (ctx) => {
  const { coupleShareCode } = ctx.state.member;
  const validateSchedule = Joi.object().keys({
    category: Joi.string(),
    isVisible: Joi.boolean().required(),
    title: Joi.string().required(),
    calendarId: Joi.number().required(),
    body: Joi.string().required(),
    location: Joi.string(),
    start: Joi.date().required(),
    end: Joi.date().required(),
  });
  const result = validateSchedule.validate(ctx.request.body);

  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const {
    calendarId,
    category,
    isVisible,
    title,
    body,
    location,
    start,
    end,
  } = ctx.request.body;

  try {
    const calendar = await Calendar.findByCoupleShareCode(coupleShareCode);
    const newSchedule = {
      calendarId,
      id:
        calendar.calendarData.schedules[
          calendar.calendarData.schedules.length - 1
        ].id + 1 || 0,
      category,
      isVisible,
      title,
      body,
      location,
      start,
      end,
    };

    await calendar.createSchedules(newSchedule);
    await calendar.save();

    ctx.body = calendar.calendarData.schedules;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const getSchduleList = async (ctx) => {
  const { coupleShareCode } = ctx.state.member;

  try {
    const calendar = await Calendar.findByCoupleShareCode(coupleShareCode);
    const schedules = calendar.calendarData.schedules;

    ctx.body = schedules;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const getSchdule = async (ctx) => {
  const { coupleShareCode } = ctx.state.member;
  const { scheduleId } = ctx.params;
  //Number("123원") > NaN, parseInt("123원") > 123
  const numberScheduleId = parseInt(scheduleId);

  if (isNaN(numberScheduleId)) {
    console.log("숫자만 써라;;");
    ctx.status = 409;
    return;
  }

  try {
    const calendar = await Calendar.findByCoupleShareCode(coupleShareCode);
    const schedules = calendar.calendarData.schedules;
    const findResult = schedules.find(
      (schedule) => schedule.id === numberScheduleId
    );

    if (!findResult) {
      ctx.status = 409;
      return;
    }

    ctx.body = findResult;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const deleteSchedule = async (ctx) => {
  const { coupleShareCode } = ctx.state.member;
  const { scheduleId } = ctx.params;
  const numberScheduleId = parseInt(scheduleId);

  if (isNaN(numberScheduleId)) {
    console.log("숫자만 써라;;");
    ctx.status = 409;
    return;
  }

  try {
    const calendar = await Calendar.findByCoupleShareCode(coupleShareCode);
    const result = await calendar.deleteCalendarData(
      "schedules",
      numberScheduleId
    );

    await calendar.save();

    ctx.body = result;
  } catch (e) {
    ctx.throw(500, e);
  }
};