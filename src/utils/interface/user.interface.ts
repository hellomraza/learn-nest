export class User {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public password: string,
    public hash_ref_token: string | null,
  ) {}
}
