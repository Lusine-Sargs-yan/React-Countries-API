import { Button, Card, CardActions, CardContent, Typography } from "@material-ui/core";
import './List.css';

// using material-ul
export default function List({ items, children, onItemClick }) {
  return (
    <div>
      {children}
      <ul className="list">
        {items.map(({ name, region, capital, nativeName, population, flag }) => {
          return (
            <Card className="card">
              <CardContent>
                <Typography
                  color="textSecondary"
                  gutterBottom
                >
                  Region: {region}
                </Typography>
                <Typography variant="h5" component="h2">
                  {name}
                </Typography>
                <Typography color="textSecondary">
                Captial: {capital}
                </Typography>
                <Typography color="textSecondary">
                Native Name: {nativeName}
                </Typography>
                <Typography variant="body2" component="p">
                Population: {population}
                  <br />
                  <img width='45' src={flag} alt={name}/>
                </Typography>
              </CardContent>
              <CardActions>
                <Button onClick={() => onItemClick(name)} variant="contained" color="primary"  size="medium">Click</Button>
              </CardActions>
            </Card>
          );
        })}
      </ul>
    </div>
  );
}

// export default function List({ items, children }) {
//   return (
//     <div>
//       {children}
//       <ul>
//         {items.map(({ name }) => {
//           return <li key={name}>{name}</li>;
//         })}
//       </ul>
//     </div>
//   );
// }
