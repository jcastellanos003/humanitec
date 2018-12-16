current_branch=$(\
    git branch \
  | grep \* \
  | cut -d ' ' -f2)

pkg_version=$(\
    cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g')

pkg_name=$(\
    cat package.json \
  | grep name \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g')

github_token=1632c935b98c19c2c8f3d5162ae24d11518b33fb

build_number=$CIRCLE_BUILD_NUM
git_user_email="jcastellanos003@gmail.com"
git_user_name="Julian Castellanos"
message_commit_source_bump="chore(bump): [skip ci]"