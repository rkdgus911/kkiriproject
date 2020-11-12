import Room from "../../models/room";

// 서버에 데이터를 보낼 양식
export const saveMessage = async (ctx) => {
  const { text } = ctx.request.body;
  const { coupleShareCode, _id } = ctx.state.member;

  try {
    const room = await Room.findCoupleCode(coupleShareCode);

    if (!room) {
      //이 응답은 요청이 현재 서버의 상태와 충돌될 때 보냅니다. 409
      ctx.status = 409;
      return;
    }

    console.log(ctx.request.body);

    ctx.body = room.pushMessageData({
      sender: _id,
      text,
      sendDate: new Date(),
    });
    await room.save();
    ctx.body = room.serialize();
  } catch (e) {
    ctx.throw(500, e);
  }
};

// 서버에서 받을 양식
export const getMessageList = async (ctx) => {
  const { member } = ctx.state;
  const copleShareCode = member.coupleShareCode;
  const room = await Room.findCoupleCode(copleShareCode);

  if (!room) {
    ctx.status = 409;
    return;
  }

  console.log(room);
  const chattingData = room.chattingData;
  ctx.body = chattingData;
};
