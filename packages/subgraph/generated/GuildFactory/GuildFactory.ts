// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class NewGuild extends ethereum.Event {
  get params(): NewGuild__Params {
    return new NewGuild__Params(this);
  }
}

export class NewGuild__Params {
  _event: NewGuild;

  constructor(event: NewGuild) {
    this._event = event;
  }

  get guildOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get guild(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class GuildFactory extends ethereum.SmartContract {
  static bind(address: Address): GuildFactory {
    return new GuildFactory("GuildFactory", address);
  }

  predictDeterministicAddress(_salt: Bytes): Address {
    let result = super.call(
      "predictDeterministicAddress",
      "predictDeterministicAddress(bytes32):(address)",
      [ethereum.Value.fromFixedBytes(_salt)]
    );

    return result[0].toAddress();
  }

  try_predictDeterministicAddress(_salt: Bytes): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "predictDeterministicAddress",
      "predictDeterministicAddress(bytes32):(address)",
      [ethereum.Value.fromFixedBytes(_salt)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  template(): Address {
    let result = super.call("template", "template():(address)", []);

    return result[0].toAddress();
  }

  try_template(): ethereum.CallResult<Address> {
    let result = super.tryCall("template", "template():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }
}

export class CreateGuildCall extends ethereum.Call {
  get inputs(): CreateGuildCall__Inputs {
    return new CreateGuildCall__Inputs(this);
  }

  get outputs(): CreateGuildCall__Outputs {
    return new CreateGuildCall__Outputs(this);
  }
}

export class CreateGuildCall__Inputs {
  _call: CreateGuildCall;

  constructor(call: CreateGuildCall) {
    this._call = call;
  }

  get _initData(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }
}

export class CreateGuildCall__Outputs {
  _call: CreateGuildCall;

  constructor(call: CreateGuildCall) {
    this._call = call;
  }
}

export class CreateGuild1Call extends ethereum.Call {
  get inputs(): CreateGuild1Call__Inputs {
    return new CreateGuild1Call__Inputs(this);
  }

  get outputs(): CreateGuild1Call__Outputs {
    return new CreateGuild1Call__Outputs(this);
  }
}

export class CreateGuild1Call__Inputs {
  _call: CreateGuild1Call;

  constructor(call: CreateGuild1Call) {
    this._call = call;
  }

  get _initData(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get _salt(): Bytes {
    return this._call.inputValues[1].value.toBytes();
  }
}

export class CreateGuild1Call__Outputs {
  _call: CreateGuild1Call;

  constructor(call: CreateGuild1Call) {
    this._call = call;
  }
}

export class InitializeCall extends ethereum.Call {
  get inputs(): InitializeCall__Inputs {
    return new InitializeCall__Inputs(this);
  }

  get outputs(): InitializeCall__Outputs {
    return new InitializeCall__Outputs(this);
  }
}

export class InitializeCall__Inputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }

  get _template(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class InitializeCall__Outputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }
}
