type UserData = {
  email: string;

  // 0が開始、1が途中、2が終了、3が最初と終了を兼ねている場合
  state: 0 | 1 | 2 | 3;
  data: string;
};

export { UserData };
