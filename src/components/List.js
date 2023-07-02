import { Button, Card, CardActions, CardContent, Typography } from "@material-ui/core";
import './List.css';

// using material-ul
export default function List({ items, children, onItemClick }) {

    items.sort((a, b) => {
        const nameA = a.name.common.toLowerCase();
        const nameB = b.name.common.toLowerCase();

        if(nameA < nameB) return -1;
        if(nameA > nameB) return 1;

        return 0;

    });
  return (
    <div>
      <div className="children">{children}</div>
      <ul className="list">
        {items.map(({ name, region, capital, population, flags }) => {
          return (
            <Card className="card" key={name.common}>
              <CardContent>
                <Typography
                  color="textSecondary"
                  gutterBottom
                >
                  Region: {region}
                </Typography>
                <Typography variant="h5" component="h2">
                  {name.common}
                </Typography>
                <Typography color="textSecondary">
                    Captial: {capital}
                </Typography>
                <Typography color="textSecondary">
                    Official Name: {name.official}
                </Typography>
                <Typography variant="body2" component="p">
                    Population: {population}
                  <br />
                  <img width='45' src={flags.png} alt={flags.alt}/>
                </Typography>
              </CardContent>
              <CardActions>
                <Button onClick={() => onItemClick(name.common)} variant="contained" color="primary"  size="medium">Click</Button>
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
