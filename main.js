$(document).ready(function(){

  function diffDays (date1, date2) {
    var oneDay = 24*60*60*1000, // hours*minutes*seconds*milliseconds
        firstDate = new Date(date1),
        secondDate = new Date(date2);

    var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
    return diffDays;
  }

  function dom (sel){
    return $('[data-hook="'+sel+'"]');
  }

  function updateUI (repo, days) {
    dom('days-since').text(days);
    dom('days-label').text( days == 1 ? 'Day' : 'Days' );
    dom('repo-name').text(repo.full_name)
    dom('repo-desc').text(repo.description)
    dom('repo-forks').text(repo.forks)
    dom('repo-stars').text(repo.stargazers_count)
    dom('repo-link').attr('href', repo.homepage || repo.html_url).text('github')
    dom('repo-owner-avatar').attr('src', repo.owner.avatar_url)
  }


  $.getJSON('https://api.github.com/search/repositories?q=framework+language:javascript')
  .done(function(data){
    var repos = data.items;

    var sortedRepos = repos.sort(function(repo1, repo2){
      return new Date(repo2.created_at) -  new Date(repo1.created_at)
    });

    var mostRecentRepo = sortedRepos[0];
    var daysAgo = diffDays(mostRecentRepo.created_at, new Date)

    updateUI(mostRecentRepo, daysAgo);

  })
  .error(function(data){
    console.log('oh bother...');
  })

});
