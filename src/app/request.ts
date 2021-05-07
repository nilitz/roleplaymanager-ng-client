export class StringPostRequest {
  public stringPostRequest: { postedString: string } = {
    postedString: '',
  };

  constructor(postedString: string) {
    this.stringPostRequest.postedString = postedString;
  }
}

export class TwoStringPostRequest {

  public twoStringPostRequest: { postedStringOne: string, postedStringTwo: string } = {
    postedStringOne: '',
    postedStringTwo: '',
  };

  constructor(postedStringOne: string, postedStringTwo: string) {
    this.twoStringPostRequest.postedStringOne = postedStringOne;
    this.twoStringPostRequest.postedStringTwo = postedStringTwo;
  }
}
