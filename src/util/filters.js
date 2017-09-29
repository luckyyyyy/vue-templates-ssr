export const aaa = 1;
export const level = (likes) => {
  if (likes < 2000) {
    return '倔强青铜';
  } else if (likes < 6000) {
    return '秩序白银';
  } else if (likes < 12000) {
    return '荣耀黄金';
  } else if (likes < 20000) {
    return '尊贵铂金';
  } else if (likes < 30000) {
    return '永恒钻石';
  }
  return '最强王者';
};
export const timeFilter = (left) => {
  const diffValue = (new Date().getTime() - left); // 时间差
  const timeDate = new Date(left);
  const days = Math.floor(left / 8.64e4);
  const hours = Math.floor((left / 3.6e3) % 24);
  const minutes = Math.floor((left / 60) % 60);
  const seconds = Math.floor(left % 60);
  if (days >= 1) {
    return `${timeDate.getMonth() + 1}月${timeDate.getDate()}日`;
  }
  if (hours >= 1) {
    return `${hours}小时前`;
  }
  if (minutes >= 1) {
    return `${minutes}分钟前`;
  }
  return `${seconds}秒前`;
};

export const timeFormatter = (left) => {
  const days = Math.floor(left / 8.64e4);
  const hours = Math.floor((left / 3.6e3) % 24);
  const minutes = Math.floor((left / 60) % 60);
  const seconds = Math.floor(left % 60);
  if (days >= 1) {
    return `${days}天${hours}小时${minutes}分${seconds}秒`;
  }
  if (hours >= 1) {
    return `${hours}小时${minutes}分${seconds}秒`;
  }
  if (minutes >= 1) {
    return `${minutes}分${seconds}秒`;
  }
  return `${seconds}秒`;
};
