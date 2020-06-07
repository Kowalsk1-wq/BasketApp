import jwt from 'jsonwebtoken';

function verifyJWT(request: any, response: any, next: any){
  var token = request.headers['x-access-token'];
  if (!token) return response.status(401).send({ auth: false, message: 'No token provided.' });
  
  jwt.verify(token, 'aklzaoililajh', function(err: any, decoded: any) {
    if (err) return response.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    
    // se tudo estiver ok, salva no request para uso posterior
    request.userId = decoded.id;
    next();
  });
}

export default verifyJWT;
