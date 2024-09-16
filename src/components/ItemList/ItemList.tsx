const ItemList = ({ items }: {items: any}) => {
  return <div className="item-list">
    {items.map((item: any) => {
      return <div key={item.id} className="item">
        {Object.entries(item).map(([key, value]) => {
          return <div style={{display: key === 'id' ? 'none' : 'block'}}>
            {item[key].toString()}
          </div>
        })}
      </div>;
    })}
  </div>;
}

export default ItemList;
