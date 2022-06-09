export default {
  port: 3030,
  host: 'localhost',
  dbUri: 'mongodb+srv://lae:test123@cluster0.x6ipssu.mongodb.net/flights?retryWrites=true&w=majority',
  saltWorkFactor: 10,
  accessTokenTtl: '4h',
  refreshTokenTtl: '1y',
  jwtPrivateKey: `-----BEGIN RSA PRIVATE KEY-----
  MIICXgIBAAKBgQDhcgb8htauRr4DOk9gHU6A841mf0l53RglILoI6H9ecWHi6afT
  GTQBaiDc1t8Nb0rYfDR1nd098Wp4U4UJL5LKYXAVUItuDrKYNB6exU+HS8sFyvLP
  Y+U71QDiZQ3WmZh+SUAI+tl+ZljJd8TUNoYyD0GXLWP6BJnad5fphQHPtQIDAQAB
  AoGATtV11fY8ueJo7W4FdaGp4vPHvVDDW8bRe6IvC5BpgZf6V8PG+M12XwxCg5br
  lqIVNRBxs7NJOzDhP0RNYAHvvQcoJmbmCirWbwTFW8tMj9JrxWAFPqb62WUgogg8
  /6Hcb0lqlbnLpW/ujCLdJ8jYAm4gNBQCQ5j19GkNQpGBlT0CQQD4/LB3VPbq5+I5
  ASjNjiJk8KfFIYbf7RGWeVzaoRHq/c0N9pW46jBm5fqcEg42PvH7YYM1kEtacmXu
  rOC1ZcgzAkEA58uXh5VLCgDHZNHUG4Ur2luDufBaTtjN9oW+Y9z1IZKl0RaLJcTo
  uoOTFxFN4c6MHYrGoXCOtrzFO3PhW8dAdwJBANXQcV3Yib3J6XvYYgi7MRALlZb0
  ppUvSPY2PCXHQdLRpsCB66sC+RO0FNTnsGqm/ThJUdqykfMW4C/pJ4K+5/8CQQCq
  Ix4OPt7dcMTqk7mEmbMei52clXcz+J71HCYrVrv28JUVa96m0mmgvYLxo5nu7JSb
  +ojhZqTaLKT4ho4bt5zxAkEAzfGuqN8INJryBm4YkQN2ViryTg0zQMh34dRQntkF
  YmJBKn3LpSjXQtTI6t/1cNb6qs1Ut87Pu7Tt+F1Y6kWTMQ==
  -----END RSA PRIVATE KEY-----`,
  aviationStackBaseURL: 'http://api.aviationstack.com',
  aviationStackAPIKey: '3e4060ad7b5e7780eff93bb7dab5dcf9',
};