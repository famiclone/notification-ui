const ItemList = ({ items }: {items: any}) => {
  return <div className="item-list">
    {items.map((item: any) => {
      delete item.id;
      return <div key={item.id} className="item">
        {Object.entries(item).map(([key, value]) => {
          return <div>
            {item[key].toString()}
          </div>
        })}
      </div>;
    })}
  </div>;
}

export default ItemList;
