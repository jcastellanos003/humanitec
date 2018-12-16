source 'scripts/config.sh'

function install_dependencies {
    log 'install_dependencies'
    npm install
}

function run_unit_tests {
    log 'running_unit_tests'
    npm run test
}

function build_release {
    npm run build
}

function configure_git_user {
    log 'configure_git_user'
    git config --global push.default simple
    git config --global user.email $git_user_email
    git config --global user.name $git_user_name
}

function push_release_update {
    log 'add_push_tags'
    git tag -a $pkg_version -m "$pkg_version"
    git push --follow-tags -f -u origin $current_branch
}

function bump_version {
    log 'bump_version'
    bump_npm_version patch
    git add package.json
    update_pkg_version
    git pull origin master
    git commit -m "$message_commit_source_bump"
    git push origin master
}

function bump_npm_version {
    npm --no-git-tag-version version $1
    git add package.json
}

function generate_changelog {
    log 'generate_changelog'
    ./node_modules/.bin/conventional-changelog -p angular -i CHANGELOG.md -s
    git add CHANGELOG.md
}

function create_github_release {
    log 'create_github_release'
    ./node_modules/.bin/create-github-release $pkg_version
}

function update_pkg_version {
    pkg_version=$(\
        cat package.json \
      | grep version \
      | head -1 \
      | awk -F: '{ print $2 }' \
      | sed 's/[",]//g')
}

function log {
    echo ""
    echo "---------------------------------------------------"
    echo ""
    echo "------ > " $1
    echo ""
    echo "---------------------------------------------------"
    echo ""
}