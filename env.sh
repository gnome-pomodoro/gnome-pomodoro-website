#!/usr/bin/env bash

# Enter shell environment for development
#
# Usage: `$ ./env`
#

set -e

script=`realpath -s $0`
script_path=`dirname $script`
working_dir=`pwd`

venv_name="website"
venv_path="${script_path}/.virtualenv"


if [ ! -f "${venv_path}/bin/activate" ]; then
    python -m venv --clear --system-site-packages --prompt="${venv_name}" "${venv_path}"
    source "${venv_path}/bin/activate"

    echo "Created \"$venv_path\" dir"
else
    source "${venv_path}/bin/activate"
fi

cd "${script_path}" && python setup.py develop --quiet
cd "${working_dir}"

export PS1="(${venv_name}) [\u@\h \W]\$ "

# spawn a subshell
exec $SHELL -i

