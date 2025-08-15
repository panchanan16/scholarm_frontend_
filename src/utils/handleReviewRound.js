function groupByRound(data) {
  const grouped = {};

  data.forEach(item => {
    if (!grouped[item.round]) {
      grouped[item.round] = [];
    }
    grouped[item.round].push(item);
  });

  // Convert the object into an array of { round, items }
  return Object.keys(grouped).map(round => ({
    round: Number(round),
    items: grouped[round]
  }));
}

export default groupByRound




